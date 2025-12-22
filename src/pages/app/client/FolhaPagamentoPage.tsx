import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { 
  FaUsers, 
  FaMoneyBillWave, 
  FaFileInvoice,
  FaUserTie,
  FaCalculator
} from 'react-icons/fa';

export default function FolhaPagamentoPage() {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link to="/client/dashboard" className="text-gray-600 hover:text-gray-900">
                ← Voltar
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Folha de Pagamento</h1>
                <p className="text-sm text-gray-500">Gerencie salários e benefícios</p>
              </div>
            </div>
            <button onClick={logout} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              Sair
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Funcionários</p>
                <p className="text-2xl font-bold text-blue-600">12</p>
              </div>
              <FaUsers className="h-6 w-6 text-blue-600" />
            </div>
          </motion.div>
          <motion.div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Folha Mensal</p>
                <p className="text-2xl font-bold text-green-600">R$ 45.000</p>
              </div>
              <FaMoneyBillWave className="h-6 w-6 text-green-600" />
            </div>
          </motion.div>
          <motion.div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">INSS</p>
                <p className="text-2xl font-bold text-purple-600">R$ 5.400</p>
              </div>
              <FaCalculator className="h-6 w-6 text-purple-600" />
            </div>
          </motion.div>
          <motion.div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">FGTS</p>
                <p className="text-2xl font-bold text-orange-600">R$ 3.600</p>
              </div>
              <FaFileInvoice className="h-6 w-6 text-orange-600" />
            </div>
          </motion.div>
        </div>

        <motion.div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Funcionários</h2>
          <div className="space-y-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FaUserTie className="text-gray-600" />
                  <div>
                    <p className="font-medium">Funcionário {i}</p>
                    <p className="text-sm text-gray-500">Cargo: Desenvolvedor</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">R$ 8.000</p>
                  <p className="text-sm text-gray-500">Mensal</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
