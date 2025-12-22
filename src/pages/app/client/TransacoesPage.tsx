import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  FaPlus,
  FaEye,
  FaReceipt,
  FaFileExport,
} from 'react-icons/fa';
import NewTransactionModal from '@/components/transactions/NewTransactionModal';
import ImportExportModal from '@/components/transactions/ImportExportModal';
import { getTransactions } from '@/lib/database';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  status: 'completed' | 'pending';
  method: string;
  document: string;
}

export default function TransacoesPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterMethod, setFilterMethod] = useState('all');

  const [showNewModal, setShowNewModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true);
        const data = await getTransactions();
        setTransactions(data || []);
      } catch (err) {
        console.error('Erro ao carregar transações:', err);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  const categories = [
    { label: 'Todas', value: 'all' },
    { label: 'Vendas', value: 'Vendas' },
    { label: 'Serviços', value: 'Serviços' },
    { label: 'Compras', value: 'Compras' },
    { label: 'Aluguel', value: 'Aluguel' },
    { label: 'Folha de Pagamento', value: 'Folha de Pagamento' },
    { label: 'Impostos', value: 'Impostos' },
    { label: 'Outras', value: 'Outras' },
  ];

  const methods = [
    { label: 'Todas', value: 'all' },
    { label: 'Transferência', value: 'transferencia' },
    { label: 'Boleto', value: 'boleto' },
    { label: 'Pix', value: 'pix' },
    { label: 'Cartão', value: 'cartao' },
    { label: 'Débito', value: 'debito' },
    { label: 'Dinheiro', value: 'dinheiro' },
  ];

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch =
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.document.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === 'all' || t.category === filterCategory;

    const matchesType =
      filterType === 'all' || t.type === filterType;

    const matchesMethod =
      filterMethod === 'all' || t.method === filterMethod;

    return matchesSearch && matchesCategory && matchesType && matchesMethod;
  });

  const handleAddTransaction = (newTransaction: Transaction) => {
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const handleImportTransactions = (imported: Transaction[]) => {
    setTransactions(prev => [...imported, ...prev]);
  };

  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/client/dashboard" className="text-gray-600 hover:text-gray-900">
              ← Voltar
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Transações</h1>
              <p className="text-sm text-gray-500">Controle financeiro completo</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowNewModal(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
            >
              <FaPlus className="mr-2" />
              Nova
            </button>

            <button
              onClick={() => setShowImportModal(true)}
              className="px-4 py-2 border rounded-lg"
            >
              Importar
            </button>

            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="px-4 py-2 border rounded-lg"
            >
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <SummaryCard label="Receitas" value={totalIncome} type="income" />
          <SummaryCard label="Despesas" value={totalExpenses} type="expense" />
          <SummaryCard label="Saldo" value={balance} type="balance" />
        </div>

        {/* FILTROS */}
        <div className="bg-white rounded-xl border p-6 mb-6 flex flex-wrap gap-4">
          <input
            className="border rounded-lg px-3 py-2 w-full md:w-1/3"
            placeholder="Buscar por descrição ou documento"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />

          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="all">Todos</option>
            <option value="income">Receitas</option>
            <option value="expense">Despesas</option>
          </select>

          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            {categories.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>

          <select
            value={filterMethod}
            onChange={e => setFilterMethod(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            {methods.map(m => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>

        {/* TABELA */}
        <div className="bg-white rounded-xl border overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">Data</th>
                <th className="p-3 text-left">Descrição</th>
                <th className="p-3">Categoria</th>
                <th className="p-3">Documento</th>
                <th className="p-3">Valor</th>
                <th className="p-3">Status</th>
                <th className="p-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(t => (
                <tr key={t.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{new Date(t.date).toLocaleDateString('pt-BR')}</td>
                  <td className="p-3">{t.description}</td>
                  <td className="p-3">{t.category}</td>
                  <td className="p-3">{t.document}</td>
                  <td className={`p-3 font-semibold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {t.type === 'income' ? '+' : '-'} R$ {Math.abs(t.amount).toLocaleString('pt-BR')}
                  </td>
                  <td className="p-3">{t.status === 'completed' ? 'Concluído' : 'Pendente'}</td>
                  <td className="p-3 flex gap-2">
                    <FaEye />
                    <FaReceipt />
                    <FaFileExport />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <NewTransactionModal
        isOpen={showNewModal}
        onClose={() => setShowNewModal(false)}
        onSubmit={handleAddTransaction}
      />

      <ImportExportModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        transactions={transactions}
        onImportTransactions={handleImportTransactions}
      />
    </div>
  );
}

function SummaryCard({
  label,
  value,
  type,
}: {
  label: string;
  value: number;
  type: 'income' | 'expense' | 'balance';
}) {
  const color =
    type === 'balance'
      ? value >= 0
        ? 'text-green-600'
        : 'text-red-600'
      : type === 'income'
      ? 'text-green-600'
      : 'text-red-600';

  return (
    <div className="bg-white border rounded-xl p-6">
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>R$ {value.toLocaleString('pt-BR')}</p>
    </div>
  );
}
