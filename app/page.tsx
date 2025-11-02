'use client';

import { FiDollarSign, FiFileText, FiTrendingUp, FiUsers, FiCheckCircle, FiCalendar } from 'react-icons/fi';
import Link from 'next/link';

export default function Home() {
  const servicos = [
    {
      icone: <FiFileText className="w-6 h-6 text-blue-600" />,
      titulo: 'Folha de Pagamento',
      descricao: 'Cálculo de salários, férias, 13º e benefícios com precisão e agilidade.',
      link: '/folha-pagamento'
    },
    {
      icone: <FiDollarSign className="w-6 h-6 text-green-600" />,
      titulo: 'Tributação',
      descricao: 'Planejamento tributário e apuração de impostos federais, estaduais e municipais.',
      link: '/tributacao'
    },
    {
      icone: <FiTrendingUp className="w-6 h-6 text-purple-600" />,
      titulo: 'Gestão Financeira',
      descricao: 'Controle financeiro completo para tomada de decisões estratégicas.',
      link: '/gestao-financeira'
    },
    {
      icone: <FiUsers className="w-6 h-6 text-yellow-600" />,
      titulo: 'Previdenciário',
      descricao: 'Assessoria completa em benefícios e obrigações junto ao INSS.',
      link: '/previdenciario'
    },
    {
      icone: <FiCheckCircle className="w-6 h-6 text-red-600" />,
      titulo: 'Consultoria',
      descricao: 'Soluções personalizadas para o crescimento do seu negócio.',
      link: '/consultoria'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Soluções Contábeis Completas</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Gestão financeira, tributária e previdenciária para o crescimento do seu negócio
            </p>
            <div className="mt-8">
              <Link 
                href="/consultoria" 
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg text-lg transition-colors inline-block"
              >
                Fale com um Especialista
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Serviços */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossos Serviços</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oferecemos soluções completas para todas as necessidades contábeis da sua empresa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicos.map((servico, index) => (
            <Link 
              key={index} 
              href={servico.link}
              className="group bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 hover:border-blue-200"
            >
              <div className="flex items-start">
                <div className="p-3 rounded-lg bg-opacity-20 mr-4 group-hover:bg-opacity-30 transition-colors"
                  style={{ 
                    backgroundColor: servico.icone.props.className.includes('blue') ? 'rgba(37, 99, 235, 0.1)' : 
                                    servico.icone.props.className.includes('green') ? 'rgba(22, 163, 74, 0.1)' :
                                    servico.icone.props.className.includes('purple') ? 'rgba(147, 51, 234, 0.1)' :
                                    servico.icone.props.className.includes('yellow') ? 'rgba(234, 179, 8, 0.1)' :
                                    'rgba(239, 68, 68, 0.1)' 
                  }}
                >
                  {servico.icone}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {servico.titulo}
                  </h3>
                  <p className="text-gray-600">{servico.descricao}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Destaques */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Por que nos escolher?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça as vantagens de ter nossa equipe especializada cuidando da sua contabilidade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiCheckCircle className="w-8 h-8 text-green-500" />,
                title: 'Precisão e Confiabilidade',
                description: 'Processos auditados e sistemas atualizados garantem a precisão das informações.'
              },
              {
                icon: <FiUsers className="w-8 h-8 text-blue-500" />,
                title: 'Atendimento Personalizado',
                description: 'Equipe dedicada para entender as necessidades específicas do seu negócio.'
              },
              {
                icon: <FiDollarSign className="w-8 h-8 text-purple-500" />,
                title: 'Economia de Recursos',
                description: 'Soluções inteligentes que reduzem custos e aumentam a eficiência.'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Pronto para simplificar sua contabilidade?</h2>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Entre em contato agora mesmo e descubra como podemos ajudar sua empresa a alcançar novos patamares.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/consultoria" 
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Solicitar Consultoria
            </Link>
            <Link 
              href="#" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:bg-opacity-10 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Fale Conosco
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
