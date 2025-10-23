import { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaPaperPlane, FaWhatsapp, FaMapMarkedAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar o formulário
    console.log('Formulário enviado:', formData);
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    // Limpar o formulário após o envio
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-primary-600 text-xl" />,
      title: 'Endereço',
      description: 'Rua Exemplo, 123 - Centro',
      details: 'São Paulo - SP, 01001-000',
      link: 'https://maps.google.com',
      linkText: 'Ver no Mapa',
      linkIcon: <FaMapMarkedAlt className="ml-1" />
    },
    {
      icon: <FaPhoneAlt className="text-primary-600 text-xl" />,
      title: 'Telefone',
      description: '(11) 99999-9999',
      details: '(11) 99999-9999',
      link: 'https://wa.me/5511999999999',
      linkText: 'Fale pelo WhatsApp',
      linkIcon: <FaWhatsapp className="ml-1 text-green-500" />
    },
    {
      icon: <FaEnvelope className="text-primary-600 text-xl" />,
      title: 'E-mail',
      description: 'contato@contadormaster.com.br',
      details: 'suporte@contadormaster.com.br',
      link: 'mailto:contato@contadormaster.com.br',
      linkText: 'Enviar E-mail'
    },
    {
      icon: <FaClock className="text-primary-600 text-xl" />,
      title: 'Horário de Atendimento',
      description: 'Segunda a Sexta: 9h às 18h',
      details: 'Sábado: 9h às 12h',
      extra: 'Atendimento 24h para clientes com contrato de urgência'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-600 font-semibold mb-2 inline-block">Entre em Contato</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Fale Conosco</h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Estamos prontos para ajudar sua empresa a alcançar o sucesso financeiro. Entre em contato conosco hoje mesmo.
          </p>
        </motion.div>
        <motion.div 
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div className="space-y-6">
            {contactInfo.map((item, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                  <div className="p-3 bg-primary-50 rounded-lg group-hover:bg-primary-100 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Informações de Contato</h3>
                    <p className="text-gray-700 font-medium">{item.description}</p>
                    {item.details && <p className="text-gray-600">{item.details}</p>}
                    {item.extra && <p className="mt-2 text-sm text-gray-500 italic">{item.extra}</p>}
                    {item.link && (
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center text-primary-600 hover:text-primary-800 font-medium transition-colors"
                      >
                        {item.linkText}
                        {item.linkIcon}
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div 
            variants={fadeInUp}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Entre em Contato</h2>
            <p className="text-gray-600 mb-6">Preencha o formulário abaixo ou nos envie uma mensagem diretamente.</p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome Completo</label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Seu e-mail"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefone</label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Seu telefone"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Assunto</label>
                  <div className="relative">
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-green-800 text-white border border-green-600 rounded-lg focus:ring-2 focus:ring-yellow-300 focus:border-transparent placeholder-green-300 appearance-none bg-white pr-10 transition-all duration-200"
                      required
                    >
                      <option value="">Selecione um assunto</option>
                      <option value="contabilidade">Contabilidade</option>
                      <option value="fiscal">Consultoria Fiscal</option>
                      <option value="dp">Departamento Pessoal</option>
                      <option value="outro">Outro</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensagem</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-green-800 text-white border border-green-600 rounded-lg focus:ring-2 focus:ring-yellow-300 focus:border-transparent placeholder-green-300 transition-all duration-200"
                  placeholder="Como podemos te ajudar?"
                  required
                ></textarea>
              </div>
              <div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                  >
                    <span className="font-medium">Enviar Mensagem</span>
                    <FaPaperPlane className="transform transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                * Campos obrigatórios
              </p>
            </form>
          </motion.div>
        </motion.div>
        
        {/* Mapa */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 rounded-xl overflow-hidden shadow-xl border border-gray-200"
        >
          <div className="h-96 w-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.3764150692205!2d-46.65823498502232!3d-23.55413248468699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1620000000000!5m2!1spt-BR!2sbr" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title="Localização no Mapa"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
