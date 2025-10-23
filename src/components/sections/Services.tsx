import { FaCalculator, FaFileInvoiceDollar, FaChartPie, FaHandHoldingUsd, FaBuilding, FaBalanceScale, FaRegClock, FaRegLightbulb } from 'react-icons/fa';

export function Services() {
  const services = [
    {
      icon: <FaCalculator className="text-4xl text-primary-600" />,
      title: 'Contabilidade Geral',
      description: 'Gestão completa da contabilidade da sua empresa, garantindo conformidade fiscal e contábil.'
    },
    {
      icon: <FaFileInvoiceDollar className="text-4xl text-primary-600" />,
      title: 'Departamento Pessoal',
      description: 'Terceirização completa do DP, incluindo folha de pagamento, admissões e rescisões.'
    },
    {
      icon: <FaChartPie className="text-4xl text-primary-600" />,
      title: 'Planejamento Tributário',
      description: 'Estratégias para redução legal de impostos e otimização fiscal.'
    },
    {
      icon: <FaHandHoldingUsd className="text-4xl text-primary-600" />,
      title: 'Abertura de Empresa',
      description: 'Auxílio na escolha do melhor regime tributário e todo o processo de abertura.'
    },
    {
      icon: <FaBuilding className="text-4xl text-primary-600" />,
      title: 'Legalização de Empresas',
      description: 'Regularização de empresas irregulares junto aos órgãos competentes.'
    },
    {
      icon: <FaBalanceScale className="text-4xl text-primary-600" />,
      title: 'Consultoria Contábil',
      description: 'Orientação especializada para tomada de decisões estratégicas.'
    },
    {
      icon: <FaRegClock className="text-4xl text-primary-600" />,
      title: 'Regularização Fiscal',
      description: 'Regularização de pendências fiscais e acessórias.'
    },
    {
      icon: <FaRegLightbulb className="text-4xl text-primary-600" />,
      title: 'Consultoria Empresarial',
      description: 'Apoio na gestão e desenvolvimento do seu negócio.'
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 text-sm font-semibold text-primary-700 bg-primary-100 rounded-full mb-4">
            Nossos Serviços
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Soluções Contábeis Completas
          </h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 hover:border-primary-100"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-primary-50 rounded-full mb-4 mx-auto group-hover:bg-primary-100 transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-center text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Solicitar Orçamento
          </a>
        </div>
      </div>
    </section>
  );
}

export default Services;
