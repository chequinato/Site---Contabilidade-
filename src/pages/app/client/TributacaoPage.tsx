import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { getTaxDeadlines } from "@/lib/database";
import {
  FaFileInvoice,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

interface Tax {
  id: string;
  name: string;
  deadline: string;
  status: "urgent" | "warning" | "normal";
  amount: number;
  category: string;
  description: string;
}

export default function TributacaoPage() {
  const { user, logout } = useAuth();
  const [taxes, setTaxes] = useState<Tax[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      try {
        setLoading(true);
        const taxDeadlines = await getTaxDeadlines(user.id);

        const impostos: Tax[] = taxDeadlines
          .filter(tax => !["FGTS", "INSS", "PIS"].includes(tax.name))
          .map(tax => {
            const deadlineDate = new Date(tax.deadline);
            const now = new Date();
            const sevenDaysFromNow = new Date(
              Date.now() + 7 * 24 * 60 * 60 * 1000
            );

            return {
              id: tax.id,
              name: tax.name,
              deadline: deadlineDate.toLocaleDateString("pt-BR"),
              status:
                deadlineDate < now
                  ? "urgent"
                  : deadlineDate <= sevenDaysFromNow
                  ? "warning"
                  : "normal",
              amount: Number(tax.amount) || 0,
              category: tax.category || "Não informada",
              description: tax.description || "Obrigação tributária",
            };
          });

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

  const getStatusColor = (status: Tax["status"]) => {
    switch (status) {
      case "urgent":
        return "bg-red-100 text-red-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "normal":
        return "bg-green-100 text-green-800";
    }
  };

  const getStatusIcon = (status: Tax["status"]) => {
    switch (status) {
      case "urgent":
        return <FaExclamationTriangle className="text-red-600" />;
      case "warning":
        return <FaClock className="text-yellow-600" />;
      case "normal":
        return <FaCheckCircle className="text-green-600" />;
    }
  };

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
              <h1 className="text-2xl font-bold text-gray-900">Tributação</h1>
              <p className="text-sm text-gray-500">
                Impostos e obrigações fiscais
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 border rounded-lg text-sm"
          >
            Sair
          </button>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center py-12 text-gray-600">
            Carregando dados...
          </div>
        ) : taxes.length === 0 ? (
          <div className="text-center py-12">
            <FaFileInvoice className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500">
              Nenhum imposto cadastrado ainda
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {taxes.map(tax => (
              <motion.div
                key={tax.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border p-6"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(tax.status)}
                    <div>
                      <h3 className="font-semibold">{tax.name}</h3>
                      <p className="text-sm text-gray-500">
                        {tax.description}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                      tax.status
                    )}`}
                  >
                    {tax.status === "urgent"
                      ? "Urgente"
                      : tax.status === "warning"
                      ? "Atenção"
                      : "Normal"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-gray-500">Valor</p>
                    <p className="font-semibold">
                      R$ {tax.amount.toLocaleString("pt-BR")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Vencimento</p>
                    <p className="font-semibold">{tax.deadline}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
