/*
# J.E.F.F Core Tables

Creates all four core tables for the J.E.F.F AI hub application.

## New Tables

### todos
Stores Jay's to-do items, optionally linked to a panel.
- id: UUID primary key
- text: The task description
- done: Completion boolean (default false)
- created_at: Timestamp
- panel_id: Optional panel identifier (e.g. "think-tank")

### conversations
Stores chat history for each panel's conversation.
- id: UUID primary key
- panel_id: Which panel the message belongs to
- role: 'user' | 'assistant' | 'system'
- content: Message text
- model_id: Which model was used (for assistant messages)
- created_at: Timestamp

### memories
Stores summarised memory chunks per panel for context retrieval.
- id: UUID primary key
- panel_id: Which panel owns this memory
- summary: Text summary of the memory
- created_at: Timestamp

### api_usage
Logs token usage per API call for the Guardian Mastiff monitoring panel.
- id: UUID primary key
- panel_id: Which panel triggered the call
- provider: Provider name (anthropic, openai, google, etc.)
- model_id: Specific model used
- tokens_used: Token count
- created_at: Timestamp

## Security
- RLS enabled on all tables.
- All policies use TO anon, authenticated — this is a single-tenant personal app with no sign-in.
- USING (true) is appropriate here as this is intentional shared/personal data.
*/

CREATE TABLE IF NOT EXISTS todos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text text NOT NULL,
  done boolean NOT NULL DEFAULT false,
  panel_id text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_todos" ON todos;
CREATE POLICY "anon_select_todos" ON todos FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_todos" ON todos;
CREATE POLICY "anon_insert_todos" ON todos FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_todos" ON todos;
CREATE POLICY "anon_update_todos" ON todos FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_todos" ON todos;
CREATE POLICY "anon_delete_todos" ON todos FOR DELETE
  TO anon, authenticated USING (true);


CREATE TABLE IF NOT EXISTS conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  panel_id text NOT NULL,
  role text NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content text NOT NULL,
  model_id text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_conversations_panel_id ON conversations(panel_id);

ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_conversations" ON conversations;
CREATE POLICY "anon_select_conversations" ON conversations FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_conversations" ON conversations;
CREATE POLICY "anon_insert_conversations" ON conversations FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_conversations" ON conversations;
CREATE POLICY "anon_update_conversations" ON conversations FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_conversations" ON conversations;
CREATE POLICY "anon_delete_conversations" ON conversations FOR DELETE
  TO anon, authenticated USING (true);


CREATE TABLE IF NOT EXISTS memories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  panel_id text NOT NULL,
  summary text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_memories_panel_id ON memories(panel_id);

ALTER TABLE memories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_memories" ON memories;
CREATE POLICY "anon_select_memories" ON memories FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_memories" ON memories;
CREATE POLICY "anon_insert_memories" ON memories FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_memories" ON memories;
CREATE POLICY "anon_update_memories" ON memories FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_memories" ON memories;
CREATE POLICY "anon_delete_memories" ON memories FOR DELETE
  TO anon, authenticated USING (true);


CREATE TABLE IF NOT EXISTS api_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  panel_id text NOT NULL,
  provider text NOT NULL,
  model_id text,
  tokens_used integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_api_usage_panel_id ON api_usage(panel_id);

ALTER TABLE api_usage ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_api_usage" ON api_usage;
CREATE POLICY "anon_select_api_usage" ON api_usage FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_api_usage" ON api_usage;
CREATE POLICY "anon_insert_api_usage" ON api_usage FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_api_usage" ON api_usage;
CREATE POLICY "anon_update_api_usage" ON api_usage FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_api_usage" ON api_usage;
CREATE POLICY "anon_delete_api_usage" ON api_usage FOR DELETE
  TO anon, authenticated USING (true);
