# Como Conectar o Sistema Contábil com Supabase

## Passo 1: Configurar o Supabase

1. Acesse [supabase.com](https://supabase.com) e crie um novo projeto
2. Copie as credenciais (URL e ANON KEY)
3. No seu projeto, crie um arquivo `.env` com:
   ```
   VITE_SUPABASE_URL=sua_url_aqui
   VITE_SUPABASE_ANON_KEY=sua_chave_aqui
   ```

## Passo 2: Executar o Schema SQL

1. No painel do Supabase, vá em "SQL Editor"
2. Copie e cole todo o conteúdo do arquivo `supabase-schema.sql`
3. Execute o script para criar todas as tabelas

## Passo 3: Criar Usuário Admin

Após executar o schema, execute este SQL para criar o admin:

```sql
-- Substitua 'UUID_DO_ADMIN' pelo UUID real do usuário admin
-- Você pode criar o usuário pelo painel do Supabase Authentication primeiro
INSERT INTO users (id, email, name, role) 
VALUES ('UUID_DO_ADMIN', 'admin@contador.com', 'Administrador', 'admin');
```

## Passo 4: Configurar Storage

1. No painel do Supabase, vá em "Storage"
2. Crie um bucket chamado `documents`
3. Configure as políticas de acesso (já estão no schema)

## Passo 5: Testar a Conexão

O sistema agora está conectado! Os recursos disponíveis:

### Autenticação
- Login/Cadastro real com Supabase Auth
- Sessões persistentes
- Roles (admin/client)

### Database
- **Empresas**: CRUD completo
- **Transações**: CRUD completo  
- **Prazos Tributários**: CRUD completo
- **Documentos**: Upload e gerenciamento
- **Folha de Pagamento**: CRUD completo

### Segurança
- Row Level Security (RLS) ativo
- Admins veem todos os dados
- Clientes veem apenas seus dados

## Como Usar

### Para Admin:
1. Acesse `/auth/login`
2. Use: `admin@contador.com` / `senha_admin`
3. Terá acesso a todas as empresas

### Para Clientes:
1. Cadastre-se em `/auth/register`
2. Preencha dados da empresa
3. Acesse dashboard com seus dados

### Upload de Arquivos:
- Use o componente `FileUpload`
- Arquivos salvos no Supabase Storage
- Pronto para processamento com IA

## Estrutura das Tabelas

- `users`: Perfis de usuários
- `companies`: Dados das empresas
- `transactions`: Transações financeiras
- `tax_deadlines`: Prazos tributários
- `documents`: Arquivos uploadados
- `payroll`: Folha de pagamento

## Próximos Passos

1. Implementar upload real de arquivos
2. Adicionar processamento com IA
3. Criar relatórios e dashboards avançados
4. Adicionar notificações por email
5. Implementar backup automático
