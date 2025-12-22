import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import App from './App';
import {
  Home,
  FolhaPagamento,
  Tributacao,
  GestaoFinanceira,
  Previdenciario,
} from './pages';

// Auth pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Dashboard pages
import AdminDashboard from './pages/app/admin/AdminDashboard';
import ClientDashboard from './pages/app/client/ClientDashboard';
import TransacoesPage from './pages/app/client/TransacoesPage';
import TributacaoPage from './pages/app/client/TributacaoPage';
import GestaoFinanceiraPage from './pages/app/client/GestaoFinanceiraPage';
import FolhaPagamentoPage from './pages/app/client/FolhaPagamentoPage';
import PrevidenciarioPage from './pages/app/client/PrevidenciarioPage';

import { AuthProvider } from '@/contexts/AuthContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          {/* Site público */}
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="folha-pagamento" element={<FolhaPagamento />} />
            <Route path="tributacao" element={<Tributacao />} />
            <Route path="gestao-financeira" element={<GestaoFinanceira />} />
            <Route path="previdenciario" element={<Previdenciario />} />
          </Route>

          {/* Autenticação */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />

          {/* Dashboard Admin */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Dashboard Cliente */}
          <Route path="/client/dashboard" element={<ClientDashboard />} />
          <Route path="/client/transacoes" element={<TransacoesPage />} />
          <Route path="/client/tributacao" element={<TributacaoPage />} />
          <Route path="/client/gestao-financeira" element={<GestaoFinanceiraPage />} />
          <Route path="/client/folha-pagamento" element={<FolhaPagamentoPage />} />
          <Route path="/client/previdenciario" element={<PrevidenciarioPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  </StrictMode>
);
