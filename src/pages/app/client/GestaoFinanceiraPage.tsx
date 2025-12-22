import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import {
  FaChartLine,
  FaWallet,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function GestaoFinanceiraPage() {
  const { logout } = useAuth();

  // Estados reais (iniciam zerados)
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [loading, setLoading] = useState(true);

  const profit = monthlyIncome - monthlyExpenses;
  const margin =
    monthlyIncome > 0
      ? ((profit / monthlyIncome) * 100).toFixed(1)
      : '0.0';

  useEffect(() => {
    const loadFinancialData = async () => {
      try {
        setLoading(true);

        // usuário logado
        const {
          data: { user }
        } = await supabase.auth.getUser();

        if (!user) return;

        // empresa do usuário
        const { data: company, error: companyError } = await supabase
          .from('companies')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (companyError || !company) {
          console.warn('Usuário sem empresa vinculada');
          return;
        }

        // transações da empresa
        const { data: transactions, error: txError } = await supabase
          .from('transactions')
          .select('amount, type')
          .eq('company_id', company.id)
          .eq('status', 'completed');

        if (txError || !transactions) return;

        let income = 0;
        let expenses = 0;

        transactions.forEach((t) => {
          const value = Number(t.amount);
          if (t.type === 'income') income += value;
          if (t.type === 'expense') expenses += value;
        });

        setMonthlyIncome(income);
        setMonthlyExpenses(expenses);
      } catch (error) {
        console.error('Erro ao carregar gestão financeira:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFinancialData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link
                to="/client/dashboard"
                className="text-gray-600 hover:text-gray-900"
              >
                ← Voltar
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Gestão Financeira
                </h1>
                <p className="text-sm text-gray-500">
                  Controle completo das finanças
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Receita Mensal
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {loading
                    ? '—'
                    : `R$ ${monthlyIncome.toLocaleString('pt-BR')}`}
                </p>
              </div>
              <FaArrowUp className="h-6 w-6 text-green-600" />
            </div>
          </motion.div>

          <motion.div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Despesas
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {loading
                    ? '—'
                    : `R$ ${monthlyExpenses.toLocaleString('pt-BR')}`}
                </p>
              </div>
              <FaArrowDown className="h-6 w-6 text-red-600" />
            </div>
          </motion.div>

          <motion.div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Lucro
                </p>
                <p
                  className={`text-2xl font-bold ${
                    profit >= 0 ? 'text-blue-600' : 'text-red-600'
                  }`}
                >
                  {loading
                    ? '—'
                    : `R$ ${profit.toLocaleString('pt-BR')}`}
                </p>
              </div>
              <FaWallet className="h-6 w-6 text-blue-600" />
            </div>
          </motion.div>

          <motion.div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Margem
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {loading ? '—' : `${margin}%`}
                </p>
              </div>
              <FaChartLine className="h-6 w-6 text-purple-600" />
            </div>
          </motion.div>
        </div>

        {/* Cash Flow */}
        <motion.div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Fluxo de Caixa
          </h2>

          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 text-sm">
              Nenhum dado financeiro disponível ainda
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
