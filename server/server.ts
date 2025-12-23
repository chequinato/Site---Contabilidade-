import express from 'express';
import cors from 'cors';
import { supabaseAdmin } from './lib/supabaseAdmin';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/register', async (req, res) => {
  const { name, email, password, companyName, cnpj } = req.body;

  if (!name || !email || !password || !companyName || !cnpj) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role: 'client' }
    });
    if (authError) throw authError;
    const userId = authData.user.id;

    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .insert([{ id: userId, email, name, role: 'client' }])
      .select()
      .single();
    if (userError) throw userError;

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
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
