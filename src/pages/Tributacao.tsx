import { FiFileText, FiTrendingUp, FiShield } from 'react-icons/fi';

const Tributacao = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Tributação</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-100 rounded-full mr-4">
                <FiFileText className="text-blue-600 text-xl" />
              </div>
              <h2 className="text-xl font-semibold">Declarações</h2>
            </div>
            <p className="text-gray-600">
              Elaboração e entrega de declarações fiscais e acessórias.
              Cálculo de impostos e obrigações acessórias.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-green-100 rounded-full mr-4">
                <FiTrendingUp className="text-green-600 text-xl" />
              </div>
              <h2 className="text-xl font-semibold">Planejamento</h2>
            </div>
            <p className="text-gray-600">
              Estratégias de planejamento tributário para redução legal de impostos.
              Análise de regimes tributários.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-purple-100 rounded-full mr-4">
                <FiShield className="text-purple-600 text-xl" />
              </div>
              <h2 className="text-xl font-semibold">Fiscal</h2>
            </div>
            <p className="text-gray-600">
              Assessoria em questões fiscais e tributárias.
              Acompanhamento de legislação e obrigações fiscais.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tributacao;
