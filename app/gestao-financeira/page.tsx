import { FiDollarSign, FiTrendingUp, FiPieChart, FiCreditCard, FiFileText } from 'react-icons/fi';

export default function GestaoFinanceira() {
  // Dados de exemplo para o gráfico de receitas e despesas
  const financialData = [
    { month: 'Jul', receita: 120000, despesa: 85000 },
    { month: 'Ago', receita: 135000, despesa: 92000 },
    { month: 'Set', receita: 145000, despesa: 78000 },
    { month: 'Out', receita: 128000, despesa: 95000 },
    { month: 'Nov', receita: 155000, despesa: 82000 },
  ];

  // Calcular totais
  const totalReceita = financialData.reduce((sum, item) => sum + item.receita, 0);
  const totalDespesa = financialData.reduce((sum, item) => sum + item.despesa, 0);
  const saldo = totalReceita - totalDespesa;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Gestão Financeira</h1>
      
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Receitas */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Receitas</p>
              <p className="text-2xl font-bold">R$ {totalReceita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FiTrendingUp className="text-green-600 text-xl" />
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-green-500 rounded-full" 
                style={{ width: `${(totalReceita / (totalReceita + totalDespesa)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Card Despesas */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Despesas</p>
              <p className="text-2xl font-bold">R$ {totalDespesa.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <FiCreditCard className="text-red-600 text-xl" />
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-red-500 rounded-full" 
                style={{ width: `${(totalDespesa / (totalReceita + totalDespesa)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Card Saldo */}
        <div className={`p-6 rounded-lg shadow-md border-l-4 ${saldo >= 0 ? 'border-blue-500' : 'border-red-500'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Saldo</p>
              <p className={`text-2xl font-bold ${saldo >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                R$ {Math.abs(saldo).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                {saldo < 0 && ' (Negativo)'}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FiDollarSign className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de Receitas x Despesas */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Receitas x Despesas (Últimos 5 meses)</h2>
        <div className="h-64 flex items-end space-x-2">
          {financialData.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full flex justify-center space-x-1 h-full">
                <div className="w-1/2 flex items-end">
                  <div 
                    className="w-full bg-green-500 rounded-t" 
                    style={{ height: `${(item.receita / Math.max(...financialData.map(d => d.receita))) * 80}%` }}
                    title={`Receita: R$ ${item.receita.toLocaleString('pt-BR')}`}
                  ></div>
                </div>
                <div className="w-1/2 flex items-end">
                  <div 
                    className="w-full bg-red-500 rounded-t" 
                    style={{ height: `${(item.despesa / Math.max(...financialData.map(d => d.despesa))) * 80}%` }}
                    title={`Despesa: R$ ${item.despesa.toLocaleString('pt-BR')}`}
                  ></div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-2">{item.month}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Receitas</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Despesas</span>
          </div>
        </div>
      </div>

      {/* Contas a Pagar e Receber */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contas a Receber */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Contas a Receber</h2>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
              R$ 45.200,00
            </span>
          </div>
          <div className="space-y-3">
            {[
              { id: 1, descricao: 'Venda #1234', valor: 12500, vencimento: '10/11/2023', status: 'A vencer' },
              { id: 2, descricao: 'Serviço Mensal', valor: 8500, vencimento: '15/11/2023', status: 'A vencer' },
              { id: 3, descricao: 'Venda #1235', valor: 24200, vencimento: '05/11/2023', status: 'Atrasado' },
            ].map((item) => (
              <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{item.descricao}</p>
                  <p className="text-sm text-gray-500">Venc: {item.vencimento}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.status === 'Atrasado' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contas a Pagar */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Contas a Pagar</h2>
            <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
              R$ 28.750,00
            </span>
          </div>
          <div className="space-y-3">
            {[
              { id: 1, descricao: 'Fornecedor A', valor: 12500, vencimento: '12/11/2023', status: 'A vencer' },
              { id: 2, descricao: 'Aluguel', valor: 8500, vencimento: '05/11/2023', status: 'Atrasado' },
              { id: 3, descricao: 'Conta de Luz', valor: 7750, vencimento: '15/11/2023', status: 'A vencer' },
            ].map((item) => (
              <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{item.descricao}</p>
                  <p className="text-sm text-gray-500">Venc: {item.vencimento}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.status === 'Atrasado' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
