import { useState, useRef, useEffect } from 'react';
import { FaBars, FaTimes, FaPhoneAlt, FaEnvelope, FaWhatsapp, FaChevronDown, FaChevronUp } from 'react-icons/fa';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fechar o dropdown ao clicar fora dele
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const services = [
    { name: 'Consultoria', href: '/consultoria' },
    { name: 'Gestão Financeira', href: '/gestao-financeira' },
    { name: 'Folha de Pagamento', href: '/folha-pagamento' },
    { name: 'Tributação', href: '/tributacao' },
    { name: 'Previdenciário', href: '/previdenciario' },
  ];

  const navigation = [
    { name: 'Início', href: '#home' },
    { name: 'Serviços', href: '#services' },
    { name: 'Sobre Nós', href: '#about' },
    { name: 'Contato', href: '#contact' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="w-full bg-primary-500 text-white text-sm">
        <div className="w-full max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a 
              href="https://wa.me/5511965927355" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-sm transition-all duration-200 transform hover:scale-105"
            >
              <FaWhatsapp className="w-5 h-5 mr-2" />
              <span className="font-medium">Entre em contato conosco</span>
            </a>
            <div className="hidden md:block w-px h-6 bg-white/20"></div>
            <div className="flex items-center space-x-4">
              <a href="tel:+5511965927355" className="flex items-center hover:text-primary-200 transition-colors">
                <FaPhoneAlt className="mr-2" /> (11) 96592-7355
              </a>
              <a href="mailto:martrovo@uol.com.br" className="hidden lg:flex items-center hover:text-primary-200 transition-colors">
                <FaEnvelope className="mr-2" /> martrovo@uol.com.br
              </a>
            </div>
          </div>
          <button
            onClick={() => window.location.href = '/auth/login'}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            ÁREA DO CLIENTE
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="text-2xl font-bold text-primary-700">
            <span className="text-primary-600">Marcos</span> Contábil
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative text-gray-700 hover:text-primary-600 font-medium transition-all duration-300 group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            
            {/* Menu Suspenso de Outros Serviços */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex items-center text-gray-700 hover:text-primary-600 font-medium transition-all duration-300 group"
              >
                Outros Serviços
                {isServicesOpen ? (
                  <FaChevronUp className="ml-1 text-sm" />
                ) : (
                  <FaChevronDown className="ml-1 text-sm" />
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
              
              {isServicesOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50">
                  {services.map((service) => (
                    <a
                      key={service.name}
                      href={service.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      {service.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600 focus:outline-none transition-transform duration-300 hover:rotate-90"
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 rounded-md text-gray-700 hover:bg-primary-50 hover:pl-6 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              {/* Menu de Serviços para Mobile */}
              <div className="border-t border-gray-100 my-2"></div>
              <div className="px-4 py-2 font-medium text-gray-500">Outros Serviços</div>
              {services.map((service) => (
                <a
                  key={service.name}
                  href={service.href}
                  className="block px-6 py-2 text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-600"
                  onClick={() => setIsOpen(false)}
                >
                  {service.name}
                </a>
              ))}
              <a
                href="#"
                className="block px-4 py-3 rounded-md bg-primary-600 text-white text-center hover:bg-primary-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Área do Cliente
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
