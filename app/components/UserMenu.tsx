'use client';

import { useState, useRef, useEffect } from 'react';
import { FiUser, FiChevronDown, FiLogIn } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
    setIsOpen(false);
    router.push(href);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <FiUser className="w-5 h-5" />
          <span>Área do Cliente</span>
          <FiChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div 
            className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm text-gray-500">Bem-vindo(a) de volta!</p>
            </div>
            
            <div className="py-1" role="none">
              {menuItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavigate(item.href)}
                  className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                  role="menuitem"
                >
                  {item.name}
                </button>
              ))}
            </div>
            
            <div className="border-t border-gray-100" role="none">
              <button
                onClick={() => handleNavigate('/login')}
                className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                role="menuitem"
              >
                <FiLogIn className="mr-2 w-4 h-4" />
                Fazer Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
