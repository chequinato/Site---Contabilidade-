import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import React from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Ana Carolina',
    role: 'Empresária do Ramo Alimentício',
    rating: 5,
    content: 'Contratei o serviço de contabilidade há 2 anos e foi a melhor decisão para o meu negócio. Atendimento impecável e sempre me orientam da melhor forma possível.',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
  },
  {
    id: 2,
    name: 'Ricardo Mendes',
    role: 'Dono de Clínica Médica',
    rating: 5,
    content: 'Profissionais extremamente competentes e atenciosos. Me ajudaram a organizar toda a parte contábil da clínica e hoje posso me dedicar mais aos meus pacientes.',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
  }
];

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar 
          key={star} 
          className={star <= rating ? "text-yellow-400 text-xl" : "text-gray-300 text-xl"} 
        />
      ))}
    </div>
  );
};

const FeaturedTestimonials = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-green-50 to-green-100">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center px-6 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full mb-4">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar key={star} className="text-yellow-300 mx-0.5" />
              ))}
              <span className="ml-2 text-white font-semibold">5.0</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-800">
            Avaliação 5 Estrelas dos Nossos Clientes
          </h2>
          <p className="text-lg text-green-100 max-w-3xl mx-auto">
            Veja o que nossos clientes têm a dizer sobre nossos serviços contábeis especializados.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-green-700 text-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-green-600"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary-100"
                  />
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-green-100">{testimonial.role}</p>
                  </div>
                </div>
                <div className="text-4xl text-green-500 opacity-30">
                  <FaQuoteLeft />
                </div>
              </div>
              
              <div className="mb-4">
                <RatingStars rating={testimonial.rating} />
              </div>
              
              <p className="text-white italic relative pl-6 mt-4">
                <span className="absolute left-0 top-0 text-2xl text-green-300 -mt-1">"</span>
                {testimonial.content}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <motion.a
            href="#contato"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-8 py-3 bg-white text-green-700 font-medium rounded-lg hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Quero ser o próximo a avaliar
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.a>
        </div>
      </div>
    </section>
  );
}

export default React.memo(FeaturedTestimonials);
