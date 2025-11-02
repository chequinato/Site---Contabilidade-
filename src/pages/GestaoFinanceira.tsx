import { FiDollarSign, FiPieChart, FiTrendingUp } from 'react-icons/fi';

const GestaoFinanceira = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestão Financeira</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-100 rounded-full mr-4">
                <FiDollarSign className="text-blue-600 text-xl" />
              </div>
              <h2 className="text-xl font-semibold">Fluxo de Caixa</h2>
            </div>
            <p className="text-gray-600">
              Controle completo do fluxo de caixa da sua empresa.
              Previsões financeiras e análise de resultados.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-green-100 rounded-full mr-4">
                <FiPieChart className="text-green-600 text-xl" />
              </div>
              <h2 className="text-xl font-semibold">Relatórios</h2>
            </div>
            <p className="text-gray-600">
              Relatórios financeiros detalhados e personalizados.
              Análise de rentabilidade e desempenho financeiro.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-purple-100 rounded-full mr-4">
                <FiTrendingUp className="text-purple-600 text-xl" />
              </div>
              <h2 className="text-xl font-semibold">Orçamento</h2>
            </div>
            <p className="text-gray-600">
              Planejamento orçamentário e acompanhamento de metas.
              Análise de desvios e projeções financeiras.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestaoFinanceira;
