import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { getTaxDeadlines } from '@/lib/database';
import { 
  FaUsers, 
  FaShieldAlt, 
  FaCalendarAlt, 
  FaFileInvoice,
  FaDownload,
  FaEye,
  FaHandHoldingHeart,
  FaExclamationTriangle,
  FaCheckCircle
} from 'react-icons/fa';

export default function PrevidenciarioPage() {
  const { user, logout } = useAuth();
  const [benefits, setBenefits] = useState<{name: string, value: string, deadline: string, status: string}[]>([]);

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      
      try {
        const taxDeadlines = await getTaxDeadlines(user.id);
        
        // Filtrar apenas benefícios previdenciários
        const previdenciarioBenefits = taxDeadlines
          .filter(tax => ['FGTS', 'INSS', 'PIS'].includes(tax.name))
          .map(tax => ({
            name: tax.name,
            value: `R$ ${tax.amount}`,
            deadline: new Date(tax.deadline).toLocaleDateString('pt-BR'),
            status: new Date(tax.deadline) < new Date() ? 'urgent' : 
                   new Date(tax.deadline) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) ? 'warning' : 'normal'
          }));
        
        setBenefits(previdenciarioBenefits);
      } catch (error) {
        console.error('Erro ao carregar benefícios:', error);
        setBenefits([]);
      }
    };

    loadData();
  }, [user]);

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
                <h1 className="text-2xl font-bold text-gray-900">Previdenciário</h1>
                <p className="text-sm text-gray-500">Benefícios e obrigações sociais</p>
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
                <p className="text-sm font-medium text-gray-600">FGTS Acumulado</p>
                <p className="text-2xl font-bold text-green-600">R$ 54.000</p>
              </div>
              <FaShieldAlt className="h-6 w-6 text-green-600" />
            </div>
          </motion.div>
          <motion.div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">INSS Mensal</p>
                <p className="text-2xl font-bold text-blue-600">R$ 8.200</p>
              </div>
              <FaHandHoldingHeart className="h-6 w-6 text-blue-600" />
            </div>
          </motion.div>
          <motion.div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">PIS/COFINS</p>
                <p className="text-2xl font-bold text-purple-600">R$ 10.900</p>
              </div>
              <FaFileInvoice className="h-6 w-6 text-purple-600" />
            </div>
          </motion.div>
          <motion.div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Benefícios Ativos</p>
                <p className="text-2xl font-bold text-orange-600">3</p>
              </div>
              <FaUsers className="h-6 w-6 text-orange-600" />
            </div>
          </motion.div>
        </div>

        <motion.div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Obrigações Previdenciárias</h2>
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className={`flex items-center justify-between p-4 rounded-lg border ${
                benefit.status === 'urgent' ? 'bg-red-50 border-red-200' :
                benefit.status === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                'bg-green-50 border-green-200'
              }`}>
                <div className="flex items-center space-x-3">
                  {benefit.status === 'urgent' ? <FaExclamationTriangle className="text-red-600" /> :
                   benefit.status === 'warning' ? <FaCalendarAlt className="text-yellow-600" /> :
                   <FaCheckCircle className="text-green-600" />}
                  <div>
                    <p className="font-medium text-gray-900">{benefit.name}</p>
                    <p className="text-sm text-gray-500">Vencimento: {benefit.deadline}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{benefit.value}</p>
                  <div className="flex space-x-2 mt-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <FaEye />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <FaDownload />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
