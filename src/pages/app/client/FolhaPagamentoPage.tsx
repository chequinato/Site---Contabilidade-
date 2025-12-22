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
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Employee {
  id: string;
  name: string;
  role: string;
  salary: number;
}

export default function FolhaPagamentoPage() {
  const { logout } = useAuth();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [totalPayroll, setTotalPayroll] = useState(0);
  const [inss, setInss] = useState(0);
  const [fgts, setFgts] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPayroll = async () => {
      try {
        setLoading(true);

        const {
          data: { user }
        } = await supabase.auth.getUser();

        if (!user) return;

        // empresa do usuário
        const { data: company } = await supabase
          .from('companies')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (!company) return;

        // folha de pagamento
        const { data: payroll } = await supabase
          .from('payroll')
          .select('*')
          .eq('company_id', company.id);

        if (!payroll || payroll.length === 0) {
          setEmployees([]);
          setTotalPayroll(0);
          setInss(0);
          setFgts(0);
          return;
        }

        let total = 0;
        let totalInss = 0;
        let totalFgts = 0;

        const mappedEmployees: Employee[] = payroll.map((item) => {
          total += Number(item.salary);
          totalInss += Number(item.inss);
          totalFgts += Number(item.fgts);

          return {
            id: item.id,
            name: item.employee_name,
            role: item.position,
            salary: Number(item.salary)
          };
        });

        setEmployees(mappedEmployees);
        setTotalPayroll(total);
        setInss(totalInss);
        setFgts(totalFgts);
      } catch (error) {
        console.error('Erro ao carregar folha de pagamento:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPayroll();
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
                  Folha de Pagamento
                </h1>
                <p className="text-sm text-gray-500">
                  Gerencie salários e encargos
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
                  Funcionários
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {loading ? '—' : employees.length}
                </p>
              </div>
              <FaUsers className="h-6 w-6 text-blue-600" />
            </div>
          </motion.div>

          <motion.div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Folha Mensal
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {loading ? '—' : `R$ ${totalPayroll.toLocaleString('pt-BR')}`}
                </p>
              </div>
              <FaMoneyBillWave className="h-6 w-6 text-green-600" />
            </div>
          </motion.div>

          <motion.div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">INSS</p>
                <p className="text-2xl font-bold text-purple-600">
                  {loading ? '—' : `R$ ${inss.toLocaleString('pt-BR')}`}
                </p>
              </div>
              <FaCalculator className="h-6 w-6 text-purple-600" />
            </div>
          </motion.div>

          <motion.div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">FGTS</p>
                <p className="text-2xl font-bold text-orange-600">
                  {loading ? '—' : `R$ ${fgts.toLocaleString('pt-BR')}`}
                </p>
              </div>
              <FaFileInvoice className="h-6 w-6 text-orange-600" />
            </div>
          </motion.div>
        </div>

        {/* Lista */}
        <motion.div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Funcionários
          </h2>

          {employees.length === 0 ? (
            <p className="text-sm text-gray-500">
              Nenhum funcionário cadastrado ainda
            </p>
          ) : (
            <div className="space-y-4">
              {employees.map((employee) => (
                <div
                  key={employee.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <FaUserTie className="text-gray-600" />
                    <div>
                      <p className="font-medium">{employee.name}</p>
                      <p className="text-sm text-gray-500">
                        Cargo: {employee.role}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      R$ {employee.salary.toLocaleString('pt-BR')}
                    </p>
                    <p className="text-sm text-gray-500">Mensal</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
