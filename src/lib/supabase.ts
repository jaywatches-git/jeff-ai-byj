import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Todo {
  id: string;
  text: string;
  done: boolean;
  panel_id: string | null;
  created_at: string;
}

export interface Conversation {
  id: string;
  panel_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  model_id: string | null;
  created_at: string;
}

export interface Memory {
  id: string;
  panel_id: string;
  summary: string;
  created_at: string;
}

export interface ApiUsage {
  id: string;
  panel_id: string;
  provider: string;
  model_id: string | null;
  tokens_used: number;
  created_at: string;
}
