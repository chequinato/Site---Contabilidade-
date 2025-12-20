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

import { AuthProvider } from '@/contexts/AuthContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="folha-pagamento" element={<FolhaPagamento />} />
            <Route path="tributacao" element={<Tributacao />} />
            <Route path="gestao-financeira" element={<GestaoFinanceira />} />
            <Route path="previdenciario" element={<Previdenciario />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  </StrictMode>
);
