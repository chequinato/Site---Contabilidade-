'use client';

import { useState } from 'react';
import { FiMessageSquare, FiX } from 'react-icons/fi';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 transform hover:scale-110"
        aria-label="Abrir chat"
      >
        {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
          <div className="bg-blue-600 text-white p-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Assistente Virtual</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
                aria-label="Fechar chat"
              >
                <FiX size={20} />
              </button>
            </div>
          </div>
          
          <div className="p-4 h-64 overflow-y-auto">
            <div className="mb-4">
              <div className="bg-gray-100 rounded-lg p-3 max-w-[80%] inline-block">
                <p className="text-sm text-gray-800">Olá! Como posso ajudar você hoje?</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 p-3">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Digite sua mensagem..."
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg">
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
