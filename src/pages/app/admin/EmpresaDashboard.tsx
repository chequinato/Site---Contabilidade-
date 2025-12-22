import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaArrowLeft,
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaUsers,
  FaPlus,
} from 'react-icons/fa';
import {
  getCompanies,
  getTransactions,
  createTransaction,
} from '@/lib/database';
import type { Company, Transaction } from '@/lib/database';

export default function EmpresaDashboard() {
  const { companyId } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState<Company | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const companies = await getCompanies();
    const selected = companies.find(c => c.id === companyId);
    setCompany(selected || null);

    if (companyId) {
      const tx = await getTransactions(undefined, companyId);
      setTransactions(tx);
    }

    setLoading(false);
  }

  const faturamento = transactions
    .filter(t => t.type === 'income')
    .reduce((s, t) => s + t.amount, 0);

  const despesas = transactions
    .filter(t => t.type === 'expense')
    .reduce((s, t) => s + t.amount, 0);

  if (loading) return <p className="p-6">Carregando empresa...</p>;
  if (!company) return <p className="p-6">Empresa não encontrada</p>;

  return (
    <div className="p-6 space-y-8">

      {/* HEADER */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/contador')}
          className="text-gray-600 hover:text-black"
        >
          <FaArrowLeft />
        </button>

        <div>
          <h1 className="text-2xl font-bold">{company.name}</h1>
          <p className="text-sm text-gray-500">{company.cnpj}</p>
        </div>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Faturamento" value={`R$ ${faturamento.toLocaleString('pt-BR')}`} icon={FaMoneyBillWave} />
        <Card title="Despesas" value={`R$ ${despesas.toLocaleString('pt-BR')}`} icon={FaFileInvoiceDollar} />
        <Card title="Funcionários" value="—" icon={FaUsers} />
      </div>

      {/* TRANSAÇÕES */}
      <div className="bg-white border rounded-xl">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="font-semibold text-lg">Transações</h2>

          <button
            onClick={async () => {
              await createTransaction({
                description: 'Nova transação',
                amount: 1000,
                type: 'income',
                category: 'Serviços',
                method: 'PIX',
                document: '',
                status: 'completed',
                date: new Date().toISOString(),
                company_id: company.id,
                user_id: company.user_id,
              });
              loadData();
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            <FaPlus />
            Nova transação
          </button>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-6 py-3 text-left">Descrição</th>
              <th className="px-6 py-3 text-right">Valor</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <motion.tr
                key={tx.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-t"
              >
                <td className="px-6 py-4">{tx.description}</td>
                <td className="px-6 py-4 text-right">
                  R$ {tx.amount.toLocaleString('pt-BR')}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Card({ title, value, icon: Icon }: any) {
  return (
    <div className="bg-white border rounded-xl p-5 flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
      <div className="bg-blue-600 text-white p-3 rounded-lg">
        <Icon />
      </div>
    </div>
  );
}
