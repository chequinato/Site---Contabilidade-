import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaMoneyBillWave, FaArrowUp, FaArrowDown } from 'react-icons/fa';

interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (transaction: any) => void;
}

export default function NewTransactionModal({ isOpen, onClose, onSubmit }: NewTransactionModalProps) {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'income' as 'income' | 'expense',
    category: '',
    method: '',
    document: '',
    date: new Date().toISOString().split('T')[0],
    status: 'completed' as 'completed' | 'pending'
  });

  const categories = [
    'Vendas',
    'Serviços',
    'Compras',
    'Aluguel',
    'Folha de Pagamento',
    'Impostos',
    'Outras'
  ];

  const methods = [
    'transferencia',
    'boleto',
    'pix',
    'cartao',
    'debito',
    'dinheiro'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.description || !formData.amount || !formData.category || !formData.method) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    const transaction = {
      ...formData,
      amount: formData.type === 'expense' ? -Math.abs(parseFloat(formData.amount)) : Math.abs(parseFloat(formData.amount)),
      id: Date.now().toString()
    };

    onSubmit(transaction);
    setFormData({
      description: '',
      amount: '',
      type: 'income',
      category: '',
      method: '',
      document: '',
      date: new Date().toISOString().split('T')[0],
      status: 'completed'
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Nova Transação</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes className="h-5 w-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Type Selection */}
          <div className="grid grid-cols-2 gap-4">
            <label className="relative">
              <input
                type="radio"
                name="type"
                value="income"
                checked={formData.type === 'income'}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="p-4 border-2 rounded-lg cursor-pointer transition-all peer-checked:border-green-500 peer-checked:bg-green-50 hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <FaArrowUp className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Receita</p>
                    <p className="text-sm text-gray-500">Entrada de dinheiro</p>
                  </div>
                </div>
              </div>
            </label>

            <label className="relative">
              <input
                type="radio"
                name="type"
                value="expense"
                checked={formData.type === 'expense'}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="p-4 border-2 rounded-lg cursor-pointer transition-all peer-checked:border-red-500 peer-checked:bg-red-50 hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <FaArrowDown className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="font-medium text-gray-900">Despesa</p>
                    <p className="text-sm text-gray-500">Saída de dinheiro</p>
                  </div>
                </div>
              </div>
            </label>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição *
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Ex: Recebimento de cliente"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor (R$) *
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="0,00"
            />
          </div>

          {/* Category and Method */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Selecione...</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Método de Pagamento *
              </label>
              <select
                name="method"
                value={formData.method}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Selecione...</option>
                {methods.map(method => (
                  <option key={method} value={method}>
                    {method.charAt(0).toUpperCase() + method.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Document and Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Documento
              </label>
              <input
                type="text"
                name="document"
                value={formData.document}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="NF-001234"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="completed">Concluído</option>
              <option value="pending">Pendente</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              <FaMoneyBillWave className="mr-2" />
              Adicionar Transação
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
