import { FaCheckCircle, FaChartLine, FaHandshake, FaUserTie } from 'react-icons/fa';

export function About() {
  const features = [
    {
      icon: <FaChartLine className="text-2xl text-white" />,
      title: 'Experiência',
      description: 'Mais de 15 anos de atuação no mercado contábil.'
    },
    {
      icon: <FaUserTie className="text-2xl text-white" />,
      title: 'Profissionais Qualificados',
      description: 'Equipe especializada e em constante atualização.'
    },
    {
      icon: <FaHandshake className="text-2xl text-white" />,
      title: 'Atendimento Personalizado',
      description: 'Soluções sob medida para o seu negócio.'
    }
  ];

  const aboutPoints = [
    'Atendimento personalizado para cada cliente',
    'Tecnologia de ponta em todos os processos',
    'Suporte contábil e fiscal completo',
    'Atualização constante sobre mudanças na legislação',
    'Relatórios gerenciais para tomada de decisão'
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Image Section */}
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <div className="aspect-w-16 aspect-h-9">
                <div className="w-full h-96 bg-gradient-to-r from-primary-400 to-primary-600 flex items-center justify-center text-white text-2xl font-bold">
                  [Imagem da Equipe]
                </div>
              </div>
              
              {/* Experience Badge */}
              <div className="absolute -bottom-6 right-8 bg-white rounded-lg shadow-lg p-4 text-center">
                <span className="block text-3xl font-bold text-primary-600">15+</span>
                <span className="text-sm text-gray-600">Anos de Experiência</span>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    {feature.icon}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2 lg:pl-12">
            <span className="inline-block px-4 py-1 text-sm font-semibold text-primary-700 bg-primary-100 rounded-full mb-4">
              Sobre Nós
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Excelência em Serviços Contábeis
            </h2>
            <p className="text-gray-600 mb-6">
              Somos uma empresa especializada em soluções contábeis completas para pequenas e médias empresas. 
              Nossa missão é oferecer serviços de qualidade, com transparência e ética, contribuindo para o 
              sucesso e crescimento dos nossos clientes.
            </p>
            <p className="text-gray-600 mb-8">
              Com uma equipe altamente qualificada e comprometida, buscamos sempre as melhores soluções 
              personalizadas para cada cliente, garantindo segurança e tranquilidade na gestão contábil 
              e fiscal do seu negócio.
            </p>
            
            <div className="space-y-3 mb-8">
              {aboutPoints.map((point, index) => (
                <div key={index} className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{point}</span>
                </div>
              ))}
            </div>

            <div className="bg-primary-50 border-l-4 border-primary-600 p-4 rounded-r-lg">
              <p className="text-primary-800 font-medium">
                "Comprometidos com a excelência e satisfação dos nossos clientes, buscamos sempre superar 
                expectativas e entregar resultados que realmente fazem a diferença no seu negócio."
              </p>
              <p className="text-primary-700 font-semibold mt-2">
                Equipe Contábil Master
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
