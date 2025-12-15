import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import NewsletterForm from '../NewsletterForm';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Serviços', href: '#services' },
    { name: 'Sobre Nós', href: '#about' },
    { name: 'Contato', href: '#contact' },
    { name: 'FAQ', href: '#faq' },
  ];

  const services = [
    { name: 'Contabilidade Geral', href: '#' },
    { name: 'Departamento Pessoal', href: '#' },
    { name: 'Planejamento Tributário', href: '#' },
    { name: 'Abertura de Empresa', href: '#' },
    { name: 'Consultoria Contábil', href: '#' },
  ];

  const contactInfo = [
    { icon: <FaMapMarkerAlt />, text: 'Rua Exemplo, 123 - Centro, São Paulo - SP' },
    { icon: <FaPhoneAlt />, text: '(11) 96592-7355' },
    { icon: <FaEnvelope />, text: 'martrovo@uol.com.br' },
    { icon: <FaClock />, text: 'Seg-Sex: 9h às 18h' },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, href: '#', label: 'Facebook' },
    { icon: <FaInstagram />, href: '#', label: 'Instagram' },
    { icon: <FaLinkedin />, href: '#', label: 'LinkedIn' },
    { icon: <FaYoutube />, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="w-full bg-gray-900 text-white">
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo e Sobre */}
          <div>
            <a href="#" className="text-2xl font-bold text-white mb-4 inline-block">
              <span className="text-primary-400">Contábil</span>Master
            </a>
            <p className="text-gray-400 mb-6">
              Soluções contábeis completas para o sucesso do seu negócio. Oferecemos serviços personalizados e de qualidade.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary-600 flex items-center justify-center text-white transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-gray-800">Links Rápidos</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-primary-400 transition-colors flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Serviços */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-gray-800">Nossos Serviços</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href={service.href} 
                    className="text-gray-400 hover:text-primary-400 transition-colors flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-gray-800">Informações de Contato</h3>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary-400 mt-1 mr-3">{info.icon}</span>
                  <span className="text-gray-400">{info.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <NewsletterForm />
      </div>

      {/* Copyright e Links Legais */}
      <div className="pt-8 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} ContábilMaster. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="#" className="text-gray-500 hover:text-primary-400 transition-colors">
              Política de Privacidade
            </a>
            <span className="text-gray-600">|</span>
            <a href="#" className="text-gray-500 hover:text-primary-400 transition-colors">
              Termos de Uso
            </a>
            <span className="text-gray-600">|</span>
            <a href="#" className="text-gray-500 hover:text-primary-400 transition-colors">
              Política de Cookies
            </a>
          </div>
        </div>
        <div className="mt-4 text-center md:text-left">
          <p className="text-xs text-gray-600">
            ContábilMaster Contabilidade - CRC/SP 1.234.567/O-1 - CNPJ: 12.345.678/0001-90
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
