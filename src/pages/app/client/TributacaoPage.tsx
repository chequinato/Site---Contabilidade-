import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { getTaxDeadlines } from "@/lib/database";
import { FaFileInvoice, FaCalendarAlt, FaExclamationTriangle, FaCheckCircle, FaClock } from "react-icons/fa";

interface Tax {
  id: string;
  name: string;
  deadline: string;
  status: string;
  amount: string;
  category: string;
  description: string;
}

export default function TributacaoPage() {
  const { user, logout } = useAuth();
  const [taxes, setTaxes] = useState<Tax[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const taxDeadlines = await getTaxDeadlines(user.id);
        
        const impostos: Tax[] = taxDeadlines
          .filter(tax => !["FGTS", "INSS", "PIS"].includes(tax.name))
          .map(tax => ({
            id: tax.id,
            name: tax.name,
            deadline: new Date(tax.deadline).toLocaleDateString("pt-BR"),
            status: new Date(tax.deadline) < new Date() ? "urgent" : 
                   new Date(tax.deadline) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) ? "warning" : "normal",
            amount: `R$ ${tax.amount}`,
            category: "Federal",
            description: tax.name,
          }));
        
        setTaxes(impostos);
      } catch (error) {
        console.error("Erro ao carregar impostos:", error);
        setTaxes([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "urgent": return "bg-red-100 text-red-800";
      case "warning": return "bg-yellow-100 text-yellow-800";
      case "normal": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "urgent": return <FaExclamationTriangle className="h-4 w-4" />;
      case "warning": return <FaClock className="h-4 w-4" />;
      case "normal": return <FaCheckCircle className="h-4 w-4" />;
      default: return <FaCalendarAlt className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link to="/client/dashboard" className="text-gray-600 hover:text-gray-900"> Voltar</Link>
              <h1 className="text-2xl font-bold text-gray-900">Tributação</h1>
              <p className="text-sm text-gray-500">Impostos e taxas</p>
            </div>
            <button onClick={() => logout()} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Sair
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p className="ml-3 text-gray-600">Carregando dados...</p>
          </div>
        ) : (
          <>
            {taxes.length === 0 ? (
              <div className="text-center py-12">
                <FaFileInvoice className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum imposto cadastrado</h3>
                <p className="text-gray-500">Comece adicionando suas obrigações tributárias.</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {taxes.map((tax) => (
                  <motion.div key={tax.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(tax.status)}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{tax.name}</h3>
                          <p className="text-sm text-gray-500">{tax.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(tax.status)}`}>
                          {tax.status === "urgent" ? "Urgente" : tax.status === "warning" ? "Atenção" : "Normal"}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Valor</p>
                        <p className="text-lg font-semibold text-gray-900">{tax.amount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Vencimento</p>
                        <p className="text-lg font-semibold text-gray-900">{tax.deadline}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
