import React, { useEffect, useState } from 'react';
import { FaChartLine, FaHandHoldingUsd, FaFileInvoiceDollar, FaUsers, FaAward } from 'react-icons/fa';

export function Hero() {
  const features = [
    {
      icon: <FaChartLine className="text-3xl text-primary-600" />,
      title: 'Consultoria Especializada',
      description: 'Soluções personalizadas para o crescimento do seu negócio.'
    },
    {
      icon: <FaHandHoldingUsd className="text-3xl text-primary-600" />,
      title: 'Planejamento Tributário',
      description: 'Reduza impostos de forma legal e segura.'
    },
    {
      icon: <FaFileInvoiceDollar className="text-3xl text-primary-600" />,
      title: 'Departamento Pessoal',
      description: 'Terceirização completa do DP para sua empresa.'
    },
    {
      icon: <FaUsers className="text-3xl text-primary-600" />,
      title: 'Contabilidade Completa',
      description: 'Toda a gestão contábil do seu negócio em nossas mãos.'
    }
  ];

  const [yearsExperience, setYearsExperience] = useState(0);

  useEffect(() => {
    // Animar contador de anos de experiência
    const targetYears = 15;
    const duration = 2000; // 2 segundos
    const stepTime = 50; // atualização a cada 50ms
    
    const steps = duration / stepTime;
    const increment = targetYears / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetYears) {
        setYearsExperience(targetYears);
        clearInterval(timer);
      } else {
        setYearsExperience(Math.floor(current));
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-primary-50 to-white py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/src/assets/pattern.png')] opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Text Content */}
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <div className="inline-block bg-primary-50 text-primary-700 text-sm font-semibold px-4 py-1 rounded-full mb-4">
              <span className="flex items-center">
                <FaAward className="mr-2" /> Marcos Contábil
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Seu parceiro estratégico para <span className="text-primary-600">crescer com segurança</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              Soluções contábeis completas e personalizadas para empresas de todos os portes, 
              garantindo conformidade fiscal e crescimento sustentável.
            </p>
            <div className="flex items-center mb-8 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mr-4">
                <FaAward className="text-2xl" />
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">+{yearsExperience}</div>
                <div className="text-gray-600 text-sm">Anos de Experiência</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#contact"
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Fale Conosco
              </a>
              <a
                href="#services"
                className="bg-white hover:bg-gray-50 text-primary-700 font-semibold py-3 px-8 rounded-lg border-2 border-primary-600 transition-colors duration-300"
              >
                Nossos Serviços
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-primary-600 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-full mb-4 mx-auto">
                  {React.cloneElement(feature.icon, { className: 'text-2xl text-white' })}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 text-center">
                  {feature.title}
                </h3>
                <p className="text-white/90 text-sm text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="w-full overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-16 fill-current text-white"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity="25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity="5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </section>
  );
}

export default Hero;
