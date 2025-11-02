'use client';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ChatBot from './components/ChatBot';
import Header from './components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Contador - Sua Contabilidade Digital',
  description: 'Soluções contábeis para o seu negócio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-gray-50`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {children}
            </div>
          </main>
        </div>
        <div className="fixed bottom-8 right-8 z-50">
          <ChatBot />
        </div>
      </body>
    </html>
  );
}
