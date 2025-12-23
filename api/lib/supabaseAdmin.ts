// api/lib/supabaseAdmin.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Supabase URL ou Service Role Key não está definido nas variáveis de ambiente');
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
