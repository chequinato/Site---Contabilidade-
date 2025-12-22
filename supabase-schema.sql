-- Schema SQL para o Sistema Contábil
-- Execute este script no SQL Editor do Supabase

-- Tabela de usuários (extensão do auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) CHECK (role IN ('admin', 'client')) NOT NULL DEFAULT 'client',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de empresas
CREATE TABLE IF NOT EXISTS companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  cnpj VARCHAR(18) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  status VARCHAR(50) CHECK (status IN ('active', 'pending', 'inactive')) DEFAULT 'pending',
  monthly_revenue DECIMAL(15,2),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de transações
CREATE TABLE IF NOT EXISTS transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  description TEXT NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  type VARCHAR(50) CHECK (type IN ('income', 'expense')) NOT NULL,
  category VARCHAR(100) NOT NULL,
  method VARCHAR(50) NOT NULL,
  document VARCHAR(100),
  status VARCHAR(50) CHECK (status IN ('completed', 'pending')) DEFAULT 'pending',
  date DATE NOT NULL,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de prazos tributários
CREATE TABLE IF NOT EXISTS tax_deadlines (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  amount VARCHAR(50) NOT NULL,
  deadline DATE NOT NULL,
  status VARCHAR(50) CHECK (status IN ('urgent', 'warning', 'normal')) DEFAULT 'normal',
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de documentos (para uploads)
CREATE TABLE IF NOT EXISTS documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  size INTEGER NOT NULL,
  url TEXT NOT NULL,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  ai_processed BOOLEAN DEFAULT FALSE,
  ai_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de folha de pagamento
CREATE TABLE IF NOT EXISTS payroll (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  salary DECIMAL(15,2) NOT NULL,
  inss DECIMAL(15,2) NOT NULL,
  fgts DECIMAL(15,2) NOT NULL,
  month DATE NOT NULL,
  status VARCHAR(50) CHECK (status IN ('pending', 'processed')) DEFAULT 'pending',
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_companies_user_id ON companies(user_id);
CREATE INDEX IF NOT EXISTS idx_companies_cnpj ON companies(cnpj);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_company_id ON transactions(company_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date);
CREATE INDEX IF NOT EXISTS idx_tax_deadlines_user_id ON tax_deadlines(user_id);
CREATE INDEX IF NOT EXISTS idx_tax_deadlines_company_id ON tax_deadlines(company_id);
CREATE INDEX IF NOT EXISTS idx_tax_deadlines_deadline ON tax_deadlines(deadline);
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_company_id ON documents(company_id);
CREATE INDEX IF NOT EXISTS idx_payroll_user_id ON payroll(user_id);
CREATE INDEX IF NOT EXISTS idx_payroll_company_id ON payroll(company_id);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar trigger em todas as tabelas
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tax_deadlines_updated_at BEFORE UPDATE ON tax_deadlines
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payroll_updated_at BEFORE UPDATE ON payroll
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tax_deadlines ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para usuários
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Políticas RLS para empresas (Admin vê todas, Cliente vê só as suas)
CREATE POLICY "Admins can view all companies" ON companies
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Users can view own companies" ON companies
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can insert companies" ON companies
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Users can insert own companies" ON companies
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update all companies" ON companies
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Users can update own companies" ON companies
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can delete companies" ON companies
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Políticas RLS para transações
CREATE POLICY "Admins can view all transactions" ON transactions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Users can view own transactions" ON transactions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions" ON transactions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own transactions" ON transactions
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own transactions" ON transactions
    FOR DELETE USING (auth.uid() = user_id);

-- Políticas RLS para prazos tributários
CREATE POLICY "Admins can view all tax deadlines" ON tax_deadlines
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Users can view own tax deadlines" ON tax_deadlines
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tax deadlines" ON tax_deadlines
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tax deadlines" ON tax_deadlines
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tax deadlines" ON tax_deadlines
    FOR DELETE USING (auth.uid() = user_id);

-- Políticas RLS para documentos
CREATE POLICY "Admins can view all documents" ON documents
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Users can view own documents" ON documents
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own documents" ON documents
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own documents" ON documents
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own documents" ON documents
    FOR DELETE USING (auth.uid() = user_id);

-- Políticas RLS para folha de pagamento
CREATE POLICY "Admins can view all payroll" ON payroll
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Users can view own payroll" ON payroll
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own payroll" ON payroll
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own payroll" ON payroll
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own payroll" ON payroll
    FOR DELETE USING (auth.uid() = user_id);

-- Criar usuário admin inicial (executar manualmente após setup)
-- INSERT INTO users (id, email, name, role) 
-- VALUES ('UUID_DO_ADMIN', 'admin@contador.com', 'Administrador', 'admin');

-- Storage bucket para documentos
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

-- Políticas para storage de documentos
CREATE POLICY "Users can upload own documents" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'documents' AND 
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can view own documents" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'documents' AND 
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Admins can view all documents" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'documents' AND
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );
