import { Link, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import {
  FaChartLine,
  FaFileInvoice,
  FaMoneyBillWave,
  FaUsers,
  FaBell,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock
} from 'react-icons/fa';
import { getTransactions, getTaxDeadlines, getCompanies } from '@/lib/database';
import type { Transaction, TaxDeadline, Company } from '@/lib/database';

// Dados padrão para novas contas
const getDefaultDashboardData = () => ({
  companyInfo: { name: 'Sua Empresa', cnpj: '00.000.000/0000-00', status: 'pending' as 'active' | 'pending' | 'inactive' },
  financialSummary: { monthlyRevenue: 0, monthlyExpenses: 0, profit: 0, profitMargin: 0 },
  recentTransactions: [] as Transaction[],
  taxDeadlines: [] as TaxDeadline[],
  notifications: [{ id: '1', title: 'Bem-vindo!', message: 'Complete seu cadastro para começar', type: 'info' as const, date: new Date().toISOString().split('T')[0] }],
});

const menuItems = [
  { title: 'Dashboard', icon: FaChartLine, href: '/client/dashboard', color: 'from-green-500 to-green-600', description: 'Visão geral dos seus dados' },
  { title: 'Previdenciário', icon: FaUsers, href: '/client/previdenciario', color: 'from-emerald-500 to-emerald-600', description: 'FGTS, INSS e outros' },
  { title: 'Tributação', icon: FaFileInvoice, href: '/client/tributacao', color: 'from-green-500 to-green-600', description: 'Impostos e taxas' },
  { title: 'Transações', icon: FaMoneyBillWave, href: '/client/transacoes', color: 'from-orange-500 to-orange-600', description: 'Movimentações financeiras' },
  { title: 'Gestão Financeira', icon: FaChartLine, href: '/client/gestao-financeira', color: 'from-red-500 to-red-600', description: 'Controle financeiro' },
  { title: 'Folha de Pagamento', icon: FaUsers, href: '/client/folha-pagamento', color: 'from-indigo-500 to-indigo-600', description: 'RH e salários' },
];

export default function ClientDashboard() {
  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(getDefaultDashboardData());
  const [loadingData, setLoadingData] = useState(true);
  const balance = dashboardData.financialSummary.profit;

  // Redireciona para login se não estiver logado
  if (isLoading) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      <p className="ml-3 text-gray-600">Carregando...</p>
    </div>
  );
}

if (!user) {
  return <Navigate to="/auth/login" replace />;
}


  // Carrega os dados do dashboard
  useEffect(() => {
    if (!user) return;

    const loadDashboardData = async () => {
      setLoadingData(true);
      try {
        const companies: Company[] = await getCompanies(user.id);
        const company = companies?.[0];

        const transactions: Transaction[] = company ? await getTransactions(user.id, company.id) : [];
        const taxDeadlines: TaxDeadline[] = company ? await getTaxDeadlines(user.id, company.id) : [];

        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const monthlyTransactions = transactions.filter(t => {
          const d = new Date(t.date);
          return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
        });

        const monthlyRevenue = monthlyTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
        const monthlyExpenses = monthlyTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Math.abs(t.amount), 0);
        const profit = monthlyRevenue - monthlyExpenses;
        const profitMargin = monthlyRevenue > 0 ? (profit / monthlyRevenue) * 100 : 0;

        setDashboardData({
          companyInfo: company ? { name: company.name, cnpj: company.cnpj, status: company.status } : getDefaultDashboardData().companyInfo,
          financialSummary: { monthlyRevenue, monthlyExpenses, profit, profitMargin },
          recentTransactions: transactions.slice(0, 5),
          taxDeadlines: taxDeadlines.slice(0, 5),
          notifications: company ? [{ id: '1', title: 'Dashboard atualizado', message: 'Seus dados financeiros foram atualizados', type: 'info' as const, date: new Date().toISOString().split('T')[0] }] : getDefaultDashboardData().notifications,
        });
      } catch (err) {
        console.error('Erro ao carregar dashboard:', err);
        setDashboardData(getDefaultDashboardData());
      } finally {
        setLoadingData(false);
      }
    };

    loadDashboardData();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'normal': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'urgent': return <FaExclamationTriangle className="text-red-600" />;
      case 'warning': return <FaClock className="text-yellow-600" />;
      case 'normal': return <FaCheckCircle className="text-green-600" />;
      default: return null;
    }
  };

  if (isLoading || loadingData) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        <p className="ml-3 text-gray-600">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Área do Cliente</h1>
              <p className="text-sm text-gray-500">{dashboardData.companyInfo.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <FaBell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={() => { logout(); navigate('/'); }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Bem-vindo, {user?.name || 'Usuário'}!</h2>
              <p className="text-blue-100">
                {dashboardData.companyInfo.status === 'pending'
                  ? 'Complete seu cadastro para ativar todos os recursos'
                  : 'Aqui está o resumo da sua empresa este mês'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-100">Status da Empresa</p>
              <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${dashboardData.companyInfo.status === 'active' ? 'bg-white/20 text-white' : 'bg-yellow-100 text-yellow-800'}`}>
                {dashboardData.companyInfo.status === 'active' ? 'Ativa' : 'Pendente'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {['Faturamento', 'Despesas', 'Lucro', 'Margem'].map((label, idx) => {
            const dataMap = {
              Faturamento: { value: dashboardData.financialSummary.monthlyRevenue, icon: FaMoneyBillWave, bg: 'bg-green-100', color: 'text-green-600' },
              Despesas: { value: dashboardData.financialSummary.monthlyExpenses, icon: FaFileInvoice, bg: 'bg-red-100', color: 'text-red-600' },
              Lucro: { value: dashboardData.financialSummary.profit, icon: FaChartLine, bg: 'bg-emerald-100', color: balance >= 0 ? 'text-emerald-600' : 'text-red-600' },
              Margem: { value: dashboardData.financialSummary.profitMargin, icon: FaChartLine, bg: 'bg-emerald-100', color: 'text-emerald-600' },
            } as const;
            const data = dataMap[label as keyof typeof dataMap];
            return (
              <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + idx * 0.1 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{label === 'Margem' ? `${data.value}%` : `R$ ${data.value.toLocaleString('pt-BR')}`}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${data.bg}`}>
                    <data.icon className={`h-6 w-6 ${data.color}`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Menu */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {menuItems.map((item, index) => (
            <motion.div key={item.title} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + index * 0.1 }}>
              <Link to={item.href} className="block bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:scale-105">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${item.color}`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Tax Deadlines e Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tax Deadlines */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200"><h2 className="text-lg font-semibold text-gray-900">Prazos Tributários</h2></div>
            <div className="p-6 space-y-4">
              {dashboardData.taxDeadlines.map((deadline, index) => (
                <motion.div key={deadline.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 + index * 0.1 }} className={`flex items-center justify-between p-4 rounded-lg border ${getStatusColor(deadline.status)}`}>
                  <div className="flex items-center space-x-3">{getStatusIcon(deadline.status)}
                    <div>
                      <p className="font-medium text-gray-900">{deadline.name}</p>
                      <p className="text-sm text-gray-500">Vence: {deadline.deadline}</p>
                    </div>
                  </div>
                  <div className="text-right"><p className="font-semibold">{deadline.amount}</p></div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200"><h2 className="text-lg font-semibold text-gray-900">Transações Recentes</h2></div>
            <div className="p-6 space-y-4">
              {dashboardData.recentTransactions.map((transaction, index) => (
                <motion.div key={transaction.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 + index * 0.1 }} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'income' ? '+' : ''}R$ {Math.abs(transaction.amount).toLocaleString('pt-BR')}
                    </p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {transaction.status === 'completed' ? 'Concluído' : 'Pendente'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
