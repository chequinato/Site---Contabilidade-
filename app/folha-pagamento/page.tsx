import { FiDollarSign, FiUsers, FiCalendar } from 'react-icons/fi';

export default function FolhaPagamento() {
  return (
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
            Cadastro e gerenciamento de funcionários, com histórico completo e documentos.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-purple-100 rounded-full mr-4">
              <FiCalendar className="text-purple-600 text-xl" />
            </div>
            <h2 className="text-xl font-semibold">Férias e 13º</h2>
          </div>
          <p className="text-gray-600">
            Controle de férias, 13º salário e outros benefícios trabalhistas.
          </p>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Próximos Vencimentos</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Funcionário</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cargo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vencimento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { id: 1, nome: 'João Silva', cargo: 'Desenvolvedor', tipo: 'Salário', vencimento: '05/11/2023', valor: 'R$ 8.500,00' },
                { id: 2, nome: 'Maria Santos', cargo: 'Analista', tipo: 'Férias', vencimento: '10/11/2023', valor: 'R$ 6.200,00' },
                { id: 3, nome: 'Carlos Oliveira', cargo: 'Gerente', tipo: '13º Salário', vencimento: '20/11/2023', valor: 'R$ 12.000,00' },
              ].map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{item.nome}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.cargo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.tipo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.vencimento}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{item.valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
