'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX, FiHome, FiDollarSign, FiFileText, FiTrendingUp, FiUsers, FiSettings, FiCalendar } from 'react-icons/fi';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: 'Início', href: '/', icon: <FiHome className="w-5 h-5" /> },
    { name: 'Folha de Pagamento', href: '/folha-pagamento', icon: <FiFileText className="w-5 h-5" /> },
    { name: 'Tributação', href: '/tributacao', icon: <FiDollarSign className="w-5 h-5" /> },
    { name: 'Gestão Financeira', href: '/gestao-financeira', icon: <FiTrendingUp className="w-5 h-5" /> },
    { name: 'Previdenciário', href: '/previdenciario', icon: <FiUsers className="w-5 h-5" /> },
    { name: 'Consultoria', href: '/consultoria', icon: <FiSettings className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-600 text-white"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed md:static z-30 w-64 h-full bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-blue-600">Contabilidade S.A</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
