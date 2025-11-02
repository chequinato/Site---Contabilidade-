import { FiBriefcase, FiDollarSign, FiTrendingUp, FiUsers, FiFileText, FiCheckCircle } from 'react-icons/fi';

export default function Consultoria() {
  const servicos = [
    {
      icone: <FiBriefcase className="w-6 h-6 text-blue-600" />,
      titulo: 'Planejamento Tributário',
      descricao: 'Estratégias personalizadas para redução da carga tributária dentro da legalidade.',
      beneficios: [
        'Análise do regime tributário ideal',
        'Planejamento fiscal eficiente',
        'Redução de custos tributários'
      ]
    },
    {
      icone: <FiDollarSign className="w-6 h-6 text-green-600" />,
      titulo: 'Gestão Financeira',
      descricao: 'Otimização dos recursos financeiros e melhoria nos resultados.',
      beneficios: [
        'Análise de viabilidade econômica',
        'Controle de fluxo de caixa',
        'Projeções financeiras'
      ]
    },
    {
      icone: <FiTrendingUp className="w-6 h-6 text-purple-600" />,
      titulo: 'Gestão Empresarial',
      descricao: 'Apoio na tomada de decisões estratégicas para o crescimento do negócio.',
      beneficios: [
        'Análise de mercado',
        'Plano de negócios',
        'Indicadores de desempenho'
      ]
    },
    {
      icone: <FiUsers className="w-6 h-6 text-yellow-600" />,
      titulo: 'Consultoria Trabalhista',
      descricao: 'Assessoria completa em questões trabalhistas e previdenciárias.',
      beneficios: [
        'Conformidade com a legislação',
        'Cálculos trabalhistas',
        'Orientações sobre terceirização'
      ]
    },
    {
      icone: <FiFileText className="w-6 h-6 text-red-600" />,
      titulo: 'Regularização Fiscal',
      descricao: 'Adequação às obrigações fiscais e tributárias.',
      beneficios: [
        'Regularização de pendências',
        'Recuperação de créditos',
        'Defesa em autuações fiscais'
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg">
        <h1 className="text-4xl font-bold mb-4">Consultoria Contábil e Empresarial</h1>
        <p className="text-xl text-blue-100 max-w-3xl">
          Soluções personalizadas para o crescimento e a saúde financeira do seu negócio, com uma equipe de especialistas à sua disposição.
        </p>
      </div>

      {/* Nossos Serviços */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Nossos Serviços de Consultoria</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicos.map((servico, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-opacity-20 rounded-lg mr-4" style={{ backgroundColor: servico.icone.props.className.includes('blue') ? 'rgba(37, 99, 235, 0.1)' : 
                                                                               servico.icone.props.className.includes('green') ? 'rgba(22, 163, 74, 0.1)' :
                                                                               servico.icone.props.className.includes('purple') ? 'rgba(147, 51, 234, 0.1)' :
                                                                               servico.icone.props.className.includes('yellow') ? 'rgba(234, 179, 8, 0.1)' :
                                                                               'rgba(239, 68, 68, 0.1)' }}>
                  {servico.icone}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{servico.titulo}</h3>
              </div>
              <p className="text-gray-600 mb-4">{servico.descricao}</p>
              <ul className="space-y-2">
                {servico.beneficios.map((beneficio, i) => (
                  <li key={i} className="flex items-start">
                    <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{beneficio}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Por que nos escolher? */}
      <div className="mt-16 bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Por que escolher nossa consultoria?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <FiUsers className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold">Equipe Especializada</h3>
            <p className="text-gray-600">Profissionais com vasta experiência e atualizados com as últimas mudanças na legislação.</p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <FiCheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold">Soluções Personalizadas</h3>
            <p className="text-gray-600">Estratégias adaptadas às necessidades específicas do seu negócio.</p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
              <FiDollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold">Resultados Comprovados</h3>
            <p className="text-gray-600">Histórico de sucesso em ajudar empresas a alcançarem seus objetivos financeiros.</p>
          </div>
        </div>
      </div>

      {/* Processo de Consultoria */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Como funciona nosso processo de consultoria</h2>
        <div className="relative">
          {/* Linha do tempo */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200"></div>
          
          <div className="space-y-8">
            {[
              {
                step: '1',
                title: 'Diagnóstico Inicial',
                description: 'Análise detalhada da situação atual da sua empresa para identificar necessidades e oportunidades.'
              },
              {
                step: '2',
                title: 'Plano de Ação',
                description: 'Desenvolvimento de estratégias personalizadas para atender aos objetivos do seu negócio.'
              },
              {
                step: '3',
                title: 'Implementação',
                description: 'Aplicação das soluções propostas com acompanhamento próximo da nossa equipe.'
              },
              {
                step: '4',
                title: 'Acompanhamento',
                description: 'Monitoramento contínuo dos resultados e ajustes conforme necessário.'
              }
            ].map((item, index) => (
              <div key={index} className="relative pl-12 md:pl-24">
                <div className="absolute left-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold z-10">
                  {item.step}
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Pronto para transformar seu negócio?</h2>
        <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
          Entre em contato agora mesmo e descubra como nossa consultoria pode ajudar sua empresa a alcançar novos patamares.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition-colors">
            Solicitar Consultoria
          </button>
          <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:bg-opacity-10 font-semibold py-3 px-8 rounded-lg transition-colors">
            Fale Conosco
          </button>
        </div>
      </div>
    </div>
  );
}
