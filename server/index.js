import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

const app = express();
app.use(cors());
app.use(express.json());

// ── Runtime key store — updated via /api/set-key ─────────────
const runtimeKeys = {
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || '',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || '',
  DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY || '',
  QWEN_API_KEY: process.env.QWEN_API_KEY || '',
  OLLAMA_BASE_URL: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
};

// ── Supabase client (for usage logging) ─────────────────────
const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.VITE_SUPABASE_ANON_KEY || ''
);

// ── Helpers ──────────────────────────────────────────────────

function getAnthropicClient() {
  if (!runtimeKeys.ANTHROPIC_API_KEY) return null;
  return new Anthropic({ apiKey: runtimeKeys.ANTHROPIC_API_KEY });
}

function getOpenAIClient() {
  if (!runtimeKeys.OPENAI_API_KEY) return null;
  return new OpenAI({ apiKey: runtimeKeys.OPENAI_API_KEY });
}

function getDeepSeekClient() {
  if (!runtimeKeys.DEEPSEEK_API_KEY) return null;
  return new OpenAI({
    apiKey: runtimeKeys.DEEPSEEK_API_KEY,
    baseURL: 'https://api.deepseek.com',
  });
}

function getGoogleHeaders() {
  return { 'x-goog-api-key': runtimeKeys.GOOGLE_API_KEY };
}

async function logUsage(panelId, provider, modelId, tokens) {
  if (!supabase) return;
  await supabase.from('api_usage').insert({
    panel_id: panelId,
    provider,
    model_id: modelId,
    tokens_used: tokens,
  }).catch(() => {});
}

// ── POST /api/set-key ────────────────────────────────────────
app.post('/api/set-key', (req, res) => {
  const { key, value } = req.body;
  if (key && key in runtimeKeys) {
    runtimeKeys[key] = value;
  }
  res.json({ ok: true });
});

// ── GET /api/ollama-status ───────────────────────────────────
app.get('/api/ollama-status', async (req, res) => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const r = await fetch(`${runtimeKeys.OLLAMA_BASE_URL}/api/tags`, { signal: controller.signal });
    clearTimeout(timeout);
    res.json({ online: r.ok });
  } catch {
    res.json({ online: false });
  }
});

// ── POST /api/chat ───────────────────────────────────────────
app.post('/api/chat', async (req, res) => {
  const { panelId, messages, modelId, provider } = req.body;

  if (!messages || !modelId || !provider) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Set SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');

  const sendDelta = (text) => {
    res.write(`data: ${JSON.stringify({ delta: text })}\n\n`);
  };

  const sendDone = () => {
    res.write('data: [DONE]\n\n');
    res.end();
  };

  const sendError = (msg) => {
    res.write(`data: ${JSON.stringify({ error: msg })}\n\n`);
    res.write('data: [DONE]\n\n');
    res.end();
  };

  try {
    // ── Anthropic ──────────────────────────────────────────
    if (provider === 'anthropic') {
      const client = getAnthropicClient();
      if (!client) return sendError('Anthropic API key not configured. Add it in Settings.');

      const systemMsg = messages.find(m => m.role === 'system');
      const chatMsgs = messages.filter(m => m.role !== 'system');

      const stream = await client.messages.stream({
        model: modelId,
        max_tokens: 4096,
        system: systemMsg?.content || '',
        messages: chatMsgs,
      });

      let totalTokens = 0;
      for await (const event of stream) {
        if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
          sendDelta(event.delta.text);
        }
        if (event.type === 'message_delta' && event.usage) {
          totalTokens = event.usage.output_tokens;
        }
      }
      await logUsage(panelId, 'anthropic', modelId, totalTokens);
      return sendDone();
    }

    // ── OpenAI ─────────────────────────────────────────────
    if (provider === 'openai') {
      const client = getOpenAIClient();
      if (!client) return sendError('OpenAI API key not configured. Add it in Settings.');

      const stream = await client.chat.completions.create({
        model: modelId,
        messages,
        stream: true,
      });

      let totalTokens = 0;
      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta?.content || '';
        if (delta) sendDelta(delta);
        if (chunk.usage) totalTokens = chunk.usage.completion_tokens;
      }
      await logUsage(panelId, 'openai', modelId, totalTokens);
      return sendDone();
    }

    // ── DeepSeek ───────────────────────────────────────────
    if (provider === 'deepseek') {
      const client = getDeepSeekClient();
      if (!client) return sendError('DeepSeek API key not configured. Add it in Settings.');

      const stream = await client.chat.completions.create({
        model: modelId,
        messages,
        stream: true,
      });

      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta?.content || '';
        if (delta) sendDelta(delta);
      }
      await logUsage(panelId, 'deepseek', modelId, 0);
      return sendDone();
    }

    // ── Qwen (via OpenAI-compatible API) ──────────────────
    if (provider === 'qwen') {
      if (!runtimeKeys.QWEN_API_KEY) return sendError('Qwen API key not configured. Add it in Settings.');

      const client = new OpenAI({
        apiKey: runtimeKeys.QWEN_API_KEY,
        baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
      });

      const stream = await client.chat.completions.create({
        model: modelId,
        messages,
        stream: true,
      });

      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta?.content || '';
        if (delta) sendDelta(delta);
      }
      await logUsage(panelId, 'qwen', modelId, 0);
      return sendDone();
    }

    // ── Google Gemini ──────────────────────────────────────
    if (provider === 'google') {
      if (!runtimeKeys.GOOGLE_API_KEY) return sendError('Google API key not configured. Add it in Settings.');

      const googleMessages = messages
        .filter(m => m.role !== 'system')
        .map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        }));

      const systemMsg = messages.find(m => m.role === 'system');

      const body = {
        contents: googleMessages,
        ...(systemMsg ? { systemInstruction: { parts: [{ text: systemMsg.content }] } } : {}),
        generationConfig: { maxOutputTokens: 4096 },
      };

      const googleRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:streamGenerateContent?alt=sse`,
        {
          method: 'POST',
          headers: { ...getGoogleHeaders(), 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );

      if (!googleRes.ok) {
        const err = await googleRes.text();
        return sendError(`Google API error: ${err.slice(0, 200)}`);
      }

      const reader = googleRes.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
              if (text) sendDelta(text);
            } catch {}
          }
        }
      }
      await logUsage(panelId, 'google', modelId, 0);
      return sendDone();
    }

    // ── Ollama ─────────────────────────────────────────────
    if (provider === 'ollama') {
      const ollamaMessages = messages.map(m => ({
        role: m.role === 'system' ? 'system' : m.role,
        content: m.content,
      }));

      const ollamaRes = await fetch(`${runtimeKeys.OLLAMA_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: modelId, messages: ollamaMessages, stream: true }),
      });

      if (!ollamaRes.ok) {
        return sendError(`Ollama error: ${ollamaRes.status}. Is Ollama running?`);
      }

      const reader = ollamaRes.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(Boolean);
        for (const line of lines) {
          try {
            const data = JSON.parse(line);
            const text = data.message?.content || '';
            if (text) sendDelta(text);
          } catch {}
        }
      }
      await logUsage(panelId, 'ollama', modelId, 0);
      return sendDone();
    }

    sendError(`Unknown provider: ${provider}`);

  } catch (err) {
    console.error('Chat error:', err);
    sendError(err instanceof Error ? err.message : 'Unknown error');
  }
});

// ── POST /api/image ──────────────────────────────────────────
app.post('/api/image', async (req, res) => {
  const { prompt, panelId } = req.body;

  const client = getOpenAIClient();
  if (!client) {
    return res.status(400).json({ error: 'OpenAI API key not configured. Add it in Settings.' });
  }

  try {
    const response = await client.images.generate({
      model: 'gpt-image-1',
      prompt,
      n: 1,
      size: '1024x1024',
    });

    const urls = response.data
      .map(d => d.url)
      .filter(Boolean);

    await logUsage(panelId, 'openai', 'gpt-image-1', 0);
    res.json({ urls });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Image generation failed' });
  }
});

// ── Start ────────────────────────────────────────────────────
const PORT = process.env.SERVER_PORT || 3001;
app.listen(PORT, () => {
  console.log(`[JEFF Server] Running on port ${PORT}`);
});
