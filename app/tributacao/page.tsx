import { FiFileText, FiDollarSign, FiCalendar, FiTrendingUp } from 'react-icons/fi';

export default function Tributacao() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Tributação</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <FiFileText className="text-blue-600 text-xl" />
            </div>
            <h2 className="text-xl font-semibold">Impostos Federais</h2>
          </div>
          <ul className="space-y-2 text-gray-600">
            <li>• IRPJ - Imposto de Renda Pessoa Jurídica</li>
            <li>• CSLL - Contribuição Social sobre o Lucro Líquido</li>
            <li>• PIS/PASEP</li>
            <li>• COFINS</li>
            <li>• IPI - Imposto sobre Produtos Industrializados</li>
          </ul>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <FiDollarSign className="text-green-600 text-xl" />
            </div>
            <h2 className="text-xl font-semibold">Impostos Estaduais</h2>
          </div>
          <ul className="space-y-2 text-gray-600">
            <li>• ICMS - Imposto sobre Circulação de Mercadorias</li>
            <li>• ITCMD - Imposto sobre Transmissão Causa Mortis e Doação</li>
            <li>• IPVA - Imposto sobre Propriedade de Veículos Automotores</li>
          </ul>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-purple-100 rounded-full mr-4">
              <FiCalendar className="text-purple-600 text-xl" />
            </div>
            <h2 className="text-xl font-semibold">Impostos Municipais</h2>
          </div>
          <ul className="space-y-2 text-gray-600">
            <li>• ISS - Imposto Sobre Serviços</li>
            <li>• IPTU - Imposto sobre Propriedade Predial e Territorial Urbana</li>
            <li>• ITBI - Imposto sobre Transmissão de Bens Imóveis</li>
          </ul>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-yellow-100 rounded-full mr-4">
              <FiTrendingUp className="text-yellow-600 text-xl" />
            </div>
            <h2 className="text-xl font-semibold">Planejamento Tributário</h2>
          </div>
          <p className="text-gray-600">
            Análise do regime tributário mais vantajoso (Simples Nacional, Lucro Presumido ou Lucro Real) e estratégias para redução da carga tributária de forma legal.
          </p>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Próximas Obrigações</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Obrigação</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vencimento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { id: 1, obrigacao: 'DCTF Mensal', tipo: 'Federal', vencimento: '15/11/2023', status: 'Pendente' },
                { id: 2, obrigacao: 'GIA Estadual', tipo: 'Estadual', vencimento: '20/11/2023', status: 'Pendente' },
                { id: 3, obrigacao: 'DAS', tipo: 'Federal', vencimento: '20/11/2023', status: 'Pendente' },
                { id: 4, obrigacao: 'ISS', tipo: 'Municipal', vencimento: '25/11/2023', status: 'Em dia' },
              ].map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{item.obrigacao}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.tipo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.vencimento}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === 'Pendente' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
