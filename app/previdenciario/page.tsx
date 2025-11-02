import { FiUsers, FiCalendar, FiDollarSign, FiFileText } from 'react-icons/fi';

export default function Previdenciario() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Previdenciário</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <FiUsers className="text-blue-600 text-xl" />
            </div>
            <h2 className="text-xl font-semibold">INSS</h2>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-800">Contribuições</h3>
              <p className="text-sm text-gray-600">Cálculo e recolhimento das contribuições previdenciárias de empregados e empresas.</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Benefícios</h3>
              <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                <li>Aposentadoria por idade/tempo de contribuição</li>
                <li>Auxílio-doença</li>
                <li>Salário-maternidade</li>
                <li>Pensão por morte</li>
                <li>Auxílio-acidente</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <FiCalendar className="text-green-600 text-xl" />
            </div>
            <h2 className="text-xl font-semibold">Planejamento Previdenciário</h2>
          </div>
          <div className="space-y-4">
            <p className="text-gray-600">
              Análise da melhor forma de aposentadoria de acordo com o perfil e histórico profissional do segurado.
            </p>
            <div>
              <h3 className="font-medium text-gray-800">Cálculos Especiais</h3>
              <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                <li>Fator previdenciário</li>
                <li>Pedágio de 100%</li>
                <li>Revisão de benefícios</li>
                <li>Conversão de tempo especial</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-purple-100 rounded-full mr-4">
              <FiDollarSign className="text-purple-600 text-xl" />
            </div>
            <h2 className="text-xl font-semibold">Recursos e Revisões</h2>
          </div>
          <div className="space-y-4">
            <p className="text-gray-600">
              Atuação em processos administrativos e judiciais para garantia de direitos previdenciários.
            </p>
            <div>
              <h3 className="font-medium text-gray-800">Serviços</h3>
              <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                <li>Elaboração de recursos administrativos</li>
                <li>Acompanhamento de processos no INSS</li>
                <li>Revisão de benefícios concedidos</li>
                <li>Atualização cadastral</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-yellow-100 rounded-full mr-4">
              <FiFileText className="text-yellow-600 text-xl" />
            </div>
            <h2 className="text-xl font-semibold">Documentação Necessária</h2>
          </div>
          <div className="space-y-4">
            <p className="text-gray-600">
              Lista de documentos necessários para abertura de processos e requerimentos previdenciários.
            </p>
            <div>
              <h3 className="font-medium text-gray-800">Documentos Básicos</h3>
              <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                <li>Documentos pessoais (RG, CPF, certidão de nascimento/casamento)</li>
                <li>Carteira de trabalho e previdência social</li>
                <li>Carnês de contribuição (se houver)</li>
                <li>Comprovantes de recolhimento</li>
                <li>Documentos médicos (para benefícios por incapacidade)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Tabela de Contribuições</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salário de Contribuição (R$)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alíquota</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Máximo (R$)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { faixa: 'Até R$ 1.320,00', aliquota: '7,5%', valorMaximo: 'R$ 99,00' },
                { faixa: 'De R$ 1.320,01 até R$ 2.571,29', aliquota: '9%', valorMaximo: 'R$ 112,50' },
                { faixa: 'De R$ 2.571,30 até R$ 3.856,94', aliquota: '12%', valorMaximo: 'R$ 154,28' },
                { faixa: 'De R$ 3.856,95 até R$ 7.507,49', aliquota: '14%', valorMaximo: 'R$ 269,30' },
              ].map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.faixa}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.aliquota}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.valorMaximo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          <p>Observação: Valores atualizados conforme a legislação vigente em 2023.</p>
          <p>Teto do INSS em 2023: R$ 7.507,49</p>
        </div>
      </div>
    </div>
  );
}
