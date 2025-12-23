import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import App from './App';
import AppLayout from './pages/app/AppLayout';

// SITE PÚBLICO
import Home from './pages/site/Home';

// AUTH
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// CONTADOR
import AdminDashboard from './pages/app/admin/AdminDashboard';
import EmpresaDashboard from './pages/app/admin/EmpresaDashboard';

// CLIENTE
import ClientDashboard from './pages/app/client/ClientDashboard';
import TransacoesPage from './pages/app/client/TransacoesPage';
import TributacaoPage from './pages/app/client/TributacaoPage';
import GestaoFinanceiraPage from './pages/app/client/GestaoFinanceiraPage';
import FolhaPagamentoPage from './pages/app/client/FolhaPagamentoPage';
import PrevidenciarioPage from './pages/app/client/PrevidenciarioPage';

// CONTEXT
import { AuthProvider } from '@/contexts/AuthContext';
import RedirectByRole from './pages/RedirectByRole';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          {/* REDIRECIONAMENTO POR FUNÇÃO */}
          <Route path="/redirecionando" element={<RedirectByRole />} />

          {/* SITE PÚBLICO */}
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
          </Route>

          {/* AUTH */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />

          {/* ÁREA DO CONTADOR */}
          <Route path="/contador" element={<AppLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="empresa/:companyId" element={<EmpresaDashboard />} />
          </Route>

          {/* ÁREA DO CLIENTE */}
          <Route path="/client" element={<AppLayout />}>
            <Route index element={<ClientDashboard />} />
            <Route path="transacoes" element={<TransacoesPage />} />
            <Route path="tributacao" element={<TributacaoPage />} />
            <Route path="gestao-financeira" element={<GestaoFinanceiraPage />} />
            <Route path="folha-pagamento" element={<FolhaPagamentoPage />} />
            <Route path="previdenciario" element={<PrevidenciarioPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  </StrictMode>
);
