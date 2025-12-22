import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  FaBuilding,
  FaUsers,
  FaMoneyBillWave,
  FaExclamationTriangle,
  FaPlus,
  FaTrash,
  FaEye,
} from 'react-icons/fa';
import { getCompanies, deleteCompany } from '@/lib/database';
import type { Company } from '@/lib/database';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCompanies();
  }, []);

  async function loadCompanies() {
    setLoading(true);
    const data = await getCompanies();
    setCompanies(data);
    setLoading(false);
  }

  async function handleDeleteCompany(id: string) {
    if (!confirm('Tem certeza que deseja excluir esta empresa?')) return;
    await deleteCompany(id);
    loadCompanies();
  }

  /* ===== MÉTRICAS DO CONTADOR ===== */
  const totalEmpresas = companies.length;
  const empresasAtivas = companies.filter(c => c.status === 'active').length;
  const empresasPendentes = companies.filter(c => c.status === 'pending').length;
  const faturamentoTotal = companies.reduce(
    (sum, c) => sum + (c.monthly_revenue || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Área do Contador</h1>
            <p className="text-sm text-gray-500">
              Visão geral das empresas e operações
            </p>
          </div>

          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="border px-4 py-2 rounded-lg text-sm hover:bg-gray-50"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <p>Carregando dados...</p>
        ) : (
          <>
            {/* ===== CARDS ===== */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
              <Card title="Empresas cadastradas" value={totalEmpresas} icon={FaBuilding} />
              <Card title="Empresas ativas" value={empresasAtivas} icon={FaUsers} />
              <Card
                title="Empresas com pendência"
                value={empresasPendentes}
                icon={FaExclamationTriangle}
                danger
              />
              <Card
                title="Faturamento total"
                value={`R$ ${faturamentoTotal.toLocaleString('pt-BR')}`}
                icon={FaMoneyBillWave}
              />
            </div>

            {/* ===== LISTA DE EMPRESAS ===== */}
            <div className="bg-white border rounded-xl">
              <div className="p-6 border-b flex justify-between items-center">
                <h2 className="font-semibold text-lg">Empresas</h2>

                <button
                  onClick={() => alert('Cadastro de empresa em breve')}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  <FaPlus />
                  Nova empresa
                </button>
              </div>

              <table className="w-full">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-6 py-3 text-left">Empresa</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-right">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {companies.map(company => (
                    <motion.tr
                      key={company.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium">{company.name}</p>
                        <p className="text-sm text-gray-500">{company.cnpj}</p>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            company.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {company.status === 'active'
                            ? 'Ativa'
                            : 'Com pendências'}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right space-x-4">
                        <button
                          onClick={() =>
                            navigate(`/contador/empresa/${company.id}`)
                          }
                          className="text-blue-600"
                          title="Acessar dashboard da empresa"
                        >
                          <FaEye />
                        </button>

                        <button
                          onClick={() => handleDeleteCompany(company.id)}
                          className="text-red-600"
                          title="Excluir empresa"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

/* ===== CARD COMPONENT ===== */
function Card({
  title,
  value,
  icon: Icon,
  danger,
}: {
  title: string;
  value: any;
  icon: any;
  danger?: boolean;
}) {
  return (
    <div className="bg-white border rounded-xl p-5 flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div
        className={`p-3 rounded-lg ${
          danger ? 'bg-red-600' : 'bg-blue-600'
        } text-white`}
      >
        <Icon />
      </div>
    </div>
  );
}
