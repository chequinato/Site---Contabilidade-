import { FiDollarSign, FiUsers, FiCalendar } from 'react-icons/fi';

const FolhaPagamento = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Folha de Pagamento</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-100 rounded-full mr-4">
                <FiDollarSign className="text-blue-600 text-xl" />
              </div>
              <h2 className="text-xl font-semibold">Cálculo de Folha</h2>
            </div>
            <p className="text-gray-600">
              Cálculo preciso de salários, horas extras, adicionais e descontos legais.
              Gere holerites e relatórios detalhados.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-green-100 rounded-full mr-4">
                <FiUsers className="text-green-600 text-xl" />
              </div>
              <h2 className="text-xl font-semibold">Funcionários</h2>
            </div>
            <p className="text-gray-600">
              Cadastro e gerenciamento de funcionários com histórico completo e documentos.
              Controle de férias, afastamentos e benefícios.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-purple-100 rounded-full mr-4">
                <FiCalendar className="text-purple-600 text-xl" />
              </div>
              <h2 className="text-xl font-semibold">Recorrências</h2>
            </div>
            <p className="text-gray-600">
              Configure pagamentos recorrentes e automatize processos da folha de pagamento.
              Receba alertas e notificações importantes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolhaPagamento;
