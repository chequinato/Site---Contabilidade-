'use client';

import { Metadata } from 'next';

// Componente de teste direto na página
function TesteVisivel() {
  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'red',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '5px',
      zIndex: 1000,
      textAlign: 'center',
      fontSize: '18px',
      fontWeight: 'bold'
    }}>
      TESTE VISÍVEL - CHATBOT
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Página Inicial - Contador',
  description: 'Soluções contábeis para o seu negócio',
};

export default function Home() {
  return (
    <>
      <TesteVisivel />
      <main className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Bem-vindo ao Nosso Escritório Contábil
        </h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Nossos Serviços
          </h2>
          <p className="text-gray-600">
            Oferecemos soluções contábeis completas para sua empresa. 
            Clique no ícone de chat no canto inferior direito para falar com nosso assistente virtual.
          </p>
        </div>
      </div>
    </main>
    </>
  );
}
