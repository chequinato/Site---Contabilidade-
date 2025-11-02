import { FiShield, FiUser, FiCalendar } from 'react-icons/fi';

const Previdenciario = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Previdenciário</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-100 rounded-full mr-4">
                <FiShield className="text-blue-600 text-xl" />
              </div>
              <h2 className="text-xl font-semibold">Aposentadoria</h2>
            </div>
            <p className="text-gray-600">
              Assessoria completa para aposentadoria.
              Análise de tempo de contribuição e benefícios.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-green-100 rounded-full mr-4">
                <FiUser className="text-green-600 text-xl" />
              </div>
              <h2 className="text-xl font-semibold">Auxílios</h2>
            </div>
            <p className="text-gray-600">
              Solicitação de auxílio-doença, salário-maternidade e outros benefícios.
              Acompanhamento de processos.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-purple-100 rounded-full mr-4">
                <FiCalendar className="text-purple-600 text-xl" />
              </div>
              <h2 className="text-xl font-semibold">Planejamento</h2>
            </div>
            <p className="text-gray-600">
              Estratégias de planejamento previdenciário.
              Análise de melhores opções de aposentadoria.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Previdenciario;
