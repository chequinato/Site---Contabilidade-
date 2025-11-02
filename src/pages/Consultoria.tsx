import { FiBriefcase, FiDollarSign, FiUsers } from 'react-icons/fi';

const Consultoria = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Consultoria</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-100 rounded-full mr-4">
                <FiBriefcase className="text-blue-600 text-xl" />
              </div>
              <h2 className="text-xl font-semibold">Empresarial</h2>
            </div>
            <p className="text-gray-600">
              Consultoria especializada para o seu negócio.
              Análise de processos e otimização de resultados.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-green-100 rounded-full mr-4">
                <FiDollarSign className="text-green-600 text-xl" />
              </div>
              <h2 className="text-xl font-semibold">Financeira</h2>
            </div>
            <p className="text-gray-600">
              Estratégias financeiras personalizadas.
              Análise de viabilidade e planejamento tributário.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-purple-100 rounded-full mr-4">
                <FiUsers className="text-purple-600 text-xl" />
              </div>
              <h2 className="text-xl font-semibold">RH e DP</h2>
            </div>
            <p className="text-gray-600">
              Consultoria em departamento pessoal e recursos humanos.
              Adequação à legislação trabalhista.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultoria;
