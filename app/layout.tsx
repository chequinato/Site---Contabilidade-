'use client';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ChatBot from './components/ChatBot/ChatBot';
import TestComponent from './components/TestComponent';

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
      <body className={`${inter.className} relative min-h-screen`}>
        <TestComponent />
        <div className="relative z-10">
          {children}
        </div>
        <div className="fixed bottom-8 right-8 z-50">
          <ChatBot />
        </div>
      </body>
    </html>
  );
}
