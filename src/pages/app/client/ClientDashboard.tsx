import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
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

// Mock data para demonstração
const mockDashboardData = {
  companyInfo: {
    name: 'Tech Solutions Ltda',
    cnpj: '12.345.678/0001-90',
    status: 'active',
  },
  financialSummary: {
    monthlyRevenue: 150000,
    monthlyExpenses: 85000,
    profit: 65000,
    profitMargin: 43.3,
  },
  recentTransactions: [
    {
      id: '1',
      description: 'Recebimento Cliente A',
      amount: 25000,
      type: 'income',
      date: '2024-01-15',
      status: 'completed',
    },
    {
      id: '2',
      description: 'Pagamento Fornecedores',
      amount: -12000,
      type: 'expense',
      date: '2024-01-14',
      status: 'completed',
    },
    {
      id: '3',
      description: 'Aluguel Escritório',
      amount: -8000,
      type: 'expense',
      date: '2024-01-10',
      status: 'pending',
    },
  ],
  taxDeadlines: [
    {
      name: 'FGTS - Janeiro',
      deadline: '2024-01-20',
      status: 'urgent',
      amount: 'R$ 4.500',
    },
    {
      name: 'INSS - Janeiro',
      deadline: '2024-01-25',
      status: 'warning',
      amount: 'R$ 8.200',
    },
    {
      name: 'IRPJ - Janeiro',
      deadline: '2024-01-31',
      status: 'normal',
      amount: 'R$ 12.000',
    },
  ],
  notifications: [
    {
      id: '1',
      title: 'Novo documento disponível',
      message: 'Relatório mensal de janeiro está pronto',
      type: 'info',
      date: '2024-01-15',
    },
    {
      id: '2',
      title: 'Vencimento próximo',
      message: 'FGTS de janeiro vence em 5 dias',
      type: 'warning',
      date: '2024-01-15',
    },
  ],
};

const menuItems = [
  {
    title: 'Dashboard',
    icon: FaChartLine,
    href: '/client/dashboard',
    color: 'from-green-500 to-green-600',
    description: 'Visão geral dos seus dados',
  },
  {
    title: 'Previdenciário',
    icon: FaUsers,
    href: '/client/previdenciario',
    color: 'from-emerald-500 to-emerald-600',
    description: 'FGTS, INSS e outros',
  },
  {
    title: 'Tributação',
    icon: FaFileInvoice,
    href: '/client/tributacao',
    color: 'from-green-500 to-green-600',
    description: 'Impostos e taxas',
  },
  {
    title: 'Transações',
    icon: FaMoneyBillWave,
    href: '/client/transacoes',
    color: 'from-orange-500 to-orange-600',
    description: 'Movimentações financeiras',
  },
  {
    title: 'Gestão Financeira',
    icon: FaChartLine,
    href: '/client/gestao-financeira',
    color: 'from-red-500 to-red-600',
    description: 'Controle financeiro',
  },
  {
    title: 'Folha de Pagamento',
    icon: FaUsers,
    href: '/client/folha-pagamento',
    color: 'from-indigo-500 to-indigo-600',
    description: 'RH e salários',
  },
];

export default function ClientDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dashboardData = mockDashboardData;
  const balance = dashboardData.financialSummary.profit;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'normal':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'urgent':
        return <FaExclamationTriangle className="text-red-600" />;
      case 'warning':
        return <FaClock className="text-yellow-600" />;
      case 'normal':
        return <FaCheckCircle className="text-green-600" />;
      default:
        return null;
    }
  };

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
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg p-6 mb-8 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Bem-vindo, {user?.name}!</h2>
              <p className="text-blue-100">Aqui está o resumo da sua empresa este mês</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-100">Status da Empresa</p>
              <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-white/20 text-white">
                Ativa
              </span>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Faturamento</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  R$ {dashboardData.financialSummary.monthlyRevenue.toLocaleString('pt-BR')}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <FaMoneyBillWave className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Despesas</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  R$ {dashboardData.financialSummary.monthlyExpenses.toLocaleString('pt-BR')}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <FaFileInvoice className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Lucro</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  R$ {dashboardData.financialSummary.profit.toLocaleString('pt-BR')}
                </p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-lg">
                <FaChartLine className={`h-6 w-6 ${balance >= 0 ? 'text-emerald-600' : 'text-red-600'}`} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Margem</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {dashboardData.financialSummary.profitMargin}%
                </p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-lg">
                <FaChartLine className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation Menu */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Link
                to={item.href}
                className="block bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:scale-105"
              >
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

        {/* Tax Deadlines and Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tax Deadlines */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Prazos Tributários</h2>
            </div>
            <div className="p-6 space-y-4">
              {dashboardData.taxDeadlines.map((deadline, index) => (
                <motion.div
                  key={deadline.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className={`flex items-center justify-between p-4 rounded-lg border ${getStatusColor(deadline.status)}`}
                >
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(deadline.status)}
                    <div>
                      <p className="font-medium text-gray-900">{deadline.name}</p>
                      <p className="text-sm text-gray-500">Vence: {deadline.deadline}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{deadline.amount}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Transações Recentes</h2>
            </div>
            <div className="p-6 space-y-4">
              {dashboardData.recentTransactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : ''} 
                      R$ {Math.abs(transaction.amount).toLocaleString('pt-BR')}
                    </p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      transaction.status === 'completed' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
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
