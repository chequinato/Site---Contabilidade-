// api/register.ts
import { supabaseAdmin } from './lib/supabaseAdmin.js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, password, companyName, cnpj } = req.body;

  if (!name || !email || !password || !companyName || !cnpj) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    // 1️⃣ Criar usuário no Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role: 'client' }
    });
    if (authError) throw authError;
    const userId = authData.user.id;

    // 2️⃣ Criar usuário na tabela users
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .insert([{ id: userId, email, name, role: 'client' }])
      .select()
      .single();
    if (userError) throw userError;

    // 3️⃣ Criar empresa
    const { data: companyData, error: companyError } = await supabaseAdmin
      .from('companies')
      .insert([{ name: companyName, cnpj, email, status: 'pending', user_id: userId }])
      .select()
      .single();
    if (companyError) throw companyError;

    return res.status(200).json({ user: userData, company: companyData });
  } catch (error: any) {
    console.error('Erro no cadastro:', error);
    return res.status(500).json({ error: error.message || 'Erro desconhecido' });
  }
}
