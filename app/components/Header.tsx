'use client';

import Link from 'next/link';
import UserMenu from './UserMenu';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">Contabilidade S.A</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Início</Link>
              <Link href="/#servicos" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Serviços</Link>
              <Link href="/#sobre" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Sobre Nós</Link>
              <Link href="/#contato" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Contato</Link>
            </nav>
          </div>
          
          <div className="flex items-center
          ">
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
