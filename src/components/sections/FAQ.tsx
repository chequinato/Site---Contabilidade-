import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqItems = [
    {
      question: 'Quais são os documentos necessários para abrir uma empresa?',
      answer: 'Para abrir uma empresa, são necessários documentos como RG, CPF, comprovante de residência, comprovante de endereço comercial (se houver) e outras documentações específicas dependendo do tipo de empresa. Nossa equipe pode te auxiliar com toda a lista de documentos necessários para o seu caso específico.'
    },
    {
      question: 'Qual o melhor regime tributário para o meu negócio?',
      answer: 'O regime tributário ideal depende de diversos fatores como faturamento, área de atuação, número de funcionários e outros aspectos do seu negócio. Realizamos uma análise completa para indicar a melhor opção entre Simples Nacional, Lucro Presumido ou Lucro Real.'
    },
    {
      question: 'Como funciona o processo de contabilidade terceirizada?',
      answer: 'Na contabilidade terceirizada, nossa equipe assume toda a gestão contábil, fiscal e trabalhista da sua empresa. Você se preocupa apenas em administrar seu negócio, enquanto cuidamos de toda a burocracia, garantindo conformidade com a legislação e fornecendo informações estratégicas para o crescimento da sua empresa.'
    },
    {
      question: 'Quais os prazos para entrega das obrigações fiscais?',
      answer: 'Os prazos variam conforme o tipo de obrigação e o regime tributário da empresa. Por exemplo, o DAS do Simples Nacional geralmente vence no dia 20 de cada mês, enquanto o DCTF Mensal tem prazos específicos. Nós enviamos lembretes e cuidamos de todo o processo para que você não precise se preocupar com prazos.'
    },
    {
      question: 'Como posso regularizar minha empresa que está irregular?',
      answer: 'Para regularizar uma empresa irregular, é necessário identificar as pendências (que podem ser trabalhistas, fiscais ou contábeis) e realizar os procedimentos específicos para cada caso. Nossa equipe pode fazer uma análise completa da situação da sua empresa e propor um plano de regularização adequado.'
    },
    {
      question: 'Quais os benefícios de ter uma contabilidade online?',
      answer: 'A contabilidade online oferece diversas vantagens como redução de custos, acesso facilitado às informações em tempo real, processos mais ágeis, maior segurança dos dados, integração com outros sistemas da empresa e suporte remoto especializado. Tudo isso com a mesma qualidade e segurança da contabilidade tradicional.'
    },
    {
      question: 'Como é feito o cálculo do pró-labore?',
      answer: 'O pró-labore é a remuneração dos sócios de empresas no regime de Lucro Presumido ou Lucro Real. O cálculo considera um valor mínimo baseado no salário mínimo ou um percentual sobre o faturamento, com descontos de INSS (11% a 20%) e IRRF (conforme tabela progressiva). A definição do valor ideal deve considerar as necessidades do sócio e a saúde financeira da empresa.'
    },
    {
      question: 'Preciso de um contador para abrir uma MEI?',
      answer: 'Embora seja possível abrir um MEI sem contador, contar com um profissional especializado garante que o processo seja feito corretamente, evitando problemas futuros. Além disso, o contador pode auxiliar com orientações importantes sobre emissão de notas fiscais, declarações anuais e outras obrigações do MEI.'
    }
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 text-sm font-semibold text-primary-700 bg-primary-100 rounded-full mb-4">
            Dúvidas Frequentes
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encontre respostas para as principais dúvidas sobre nossos serviços contábeis.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  className={`w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none ${activeIndex === index ? 'bg-primary-50' : ''}`}
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="text-lg font-medium text-gray-900">{item.question}</span>
                  {activeIndex === index ? (
                    <FaChevronUp className="text-primary-600" />
                  ) : (
                    <FaChevronDown className="text-gray-400" />
                  )}
                </button>
                <div 
                  className={`px-6 pb-4 pt-0 overflow-hidden transition-all duration-300 ease-in-out ${activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="text-gray-600">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-white p-8 rounded-xl shadow-lg inline-block max-w-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ainda tem dúvidas?</h3>
              <p className="text-gray-600 mb-6">
                Entre em contato conosco para esclarecer todas as suas dúvidas sobre nossos serviços contábeis.
              </p>
              <a
                href="#contact"
                className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
              >
                Fale com um Especialista
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
