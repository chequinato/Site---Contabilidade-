import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { getTaxDeadlines } from "@/lib/database";
import {
  FaUsers,
  FaShieldAlt,
  FaCalendarAlt,
  FaFileInvoice,
  FaDownload,
  FaEye,
  FaHandHoldingHeart,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";

type Status = "urgent" | "warning" | "normal";

interface Benefit {
  name: string;
  value: number;
  deadline: string;
  status: Status;
}

export default function PrevidenciarioPage() {
  const { user, logout } = useAuth();
  const [benefits, setBenefits] = useState<Benefit[]>([]);

  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      try {
        const taxDeadlines = await getTaxDeadlines(user.id);

        const previdenciarioBenefits: Benefit[] = taxDeadlines
          .filter(tax => ["FGTS", "INSS", "PIS"].includes(tax.name))
          .map(tax => {
            const deadlineDate = new Date(tax.deadline);
            const now = new Date();
            const sevenDaysFromNow = new Date(
              Date.now() + 7 * 24 * 60 * 60 * 1000
            );

            const amount =
              typeof tax.amount === "number"
                ? tax.amount
                : Number(tax.amount || 0);

            return {
              name: tax.name,
              value: amount,
              deadline: deadlineDate.toLocaleDateString("pt-BR"),
              status:
                deadlineDate < now
                  ? "urgent"
                  : deadlineDate <= sevenDaysFromNow
                  ? "warning"
                  : "normal",
            };
          });

        setBenefits(previdenciarioBenefits);
      } catch (error) {
        console.error("Erro ao carregar previdenciário:", error);
        setBenefits([]);
      }
    };

    loadData();
  }, [user]);

  // 🔥 valores reais pros cards
  const totals = useMemo(() => {
    return {
      fgts: benefits
        .filter(b => b.name === "FGTS")
        .reduce((sum, b) => sum + b.value, 0),
      inss: benefits
        .filter(b => b.name === "INSS")
        .reduce((sum, b) => sum + b.value, 0),
      pis: benefits
        .filter(b => b.name === "PIS")
        .reduce((sum, b) => sum + b.value, 0),
    };
  }, [benefits]);

  const formatMoney = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const getStatusStyles = (status: Status) => {
    switch (status) {
      case "urgent":
        return {
          container: "bg-red-50 border-red-200",
          icon: <FaExclamationTriangle className="text-red-600" />,
        };
      case "warning":
        return {
          container: "bg-yellow-50 border-yellow-200",
          icon: <FaCalendarAlt className="text-yellow-600" />,
        };
      default:
        return {
          container: "bg-green-50 border-green-200",
          icon: <FaCheckCircle className="text-green-600" />,
        };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <Link to="/client/dashboard" className="text-gray-600">
              ← Voltar
            </Link>
            <h1 className="text-2xl font-bold">Previdenciário</h1>
            <p className="text-sm text-gray-500">
              Benefícios e obrigações sociais
            </p>
          </div>
          <button onClick={logout} className="border px-4 py-2 rounded-lg">
            Sair
          </button>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card title="FGTS" value={formatMoney(totals.fgts)} icon={<FaShieldAlt />} />
          <Card title="INSS" value={formatMoney(totals.inss)} icon={<FaHandHoldingHeart />} />
          <Card title="PIS" value={formatMoney(totals.pis)} icon={<FaFileInvoice />} />
          <Card
            title="Obrigações Ativas"
            value={benefits.length.toString()}
            icon={<FaUsers />}
          />
        </div>

        {/* LISTA */}
        <motion.div className="bg-white rounded-xl border p-6">
          <h2 className="text-lg font-semibold mb-4">
            Obrigações Previdenciárias
          </h2>

          {benefits.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Nenhuma obrigação cadastrada ainda.
            </p>
          ) : (
            benefits.map((benefit, index) => {
              const styles = getStatusStyles(benefit.status);

              return (
                <div
                  key={index}
                  className={`flex justify-between p-4 rounded-lg border mb-3 ${styles.container}`}
                >
                  <div className="flex gap-3">
                    {styles.icon}
                    <div>
                      <p className="font-medium">{benefit.name}</p>
                      <p className="text-sm text-gray-500">
                        Vencimento: {benefit.deadline}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      {formatMoney(benefit.value)}
                    </p>
                    <div className="flex gap-3 justify-end mt-2">
                      <FaEye />
                      <FaDownload />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </motion.div>
      </div>
    </div>
  );
}

function Card({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.div className="bg-white rounded-xl border p-6 flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="text-xl text-gray-600">{icon}</div>
    </motion.div>
  );
}
