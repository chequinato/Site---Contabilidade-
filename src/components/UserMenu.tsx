import { useState, useRef, useEffect } from 'react';
import { FiUser, FiChevronDown, FiLogIn } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Folha de Pagamento', href: '/folha-pagamento' },
    { name: 'Tributação', href: '/tributacao' },
    { name: 'Gestão Financeira', href: '/gestao-financeira' },
    { name: 'Previdenciário', href: '/previdenciario' },
    { name: 'Consultoria', href: '/consultoria' },
  ];

  // Fechar o menu ao clicar fora dele
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavigate = (href: string) => {
    navigate(href);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-sm transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        <FiUser className="w-5 h-5" />
        <span className="font-medium">Área do Cliente</span>
        <FiChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      <div 
        className={`absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200 transform transition-all duration-200 origin-top-right ${
          isOpen 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm text-gray-500">Bem-vindo(a) de volta!</p>
          </div>
          
          <div className="py-1">
            {menuItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavigate(item.href)}
                className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
              >
                {item.name}
              </button>
            ))}
          </div>
          
          <div className="border-t border-gray-100">
            <button
              onClick={() => handleNavigate('/login')}
              className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
            >
              <FiLogIn className="mr-2 w-4 h-4" />
              Fazer Login
            </button>
          </div>
        </div>
      
    </div>
  );
};

export default UserMenu;
