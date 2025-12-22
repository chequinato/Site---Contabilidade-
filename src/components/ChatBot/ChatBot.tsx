import { useState, useEffect, useRef } from 'react';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

export default function ChatBot() {
  // Verifica se é a primeira vez que o usuário acessa o site
  const [hasOpenedBefore, setHasOpenedBefore] = useState<boolean | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: 'Olá! Sou o assistente virtual do escritório. Como posso te ajudar hoje?', 
      sender: 'bot',
      timestamp: new Date()
    }
  ]);

  // Efeito para carregar o estado do localStorage
  useEffect(() => {
    const chatState = localStorage.getItem('chatState');
    if (chatState === 'opened') {
      setHasOpenedBefore(true);
      setIsOpen(false);
    } else {
      setHasOpenedBefore(false);
      setIsOpen(true);
      localStorage.setItem('chatState', 'opened');
    }
  }, []);

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowTooltip(false);
  };

  const handleCloseChat = () => {
    setIsOpen(false);
    setShowTooltip(true);
    // Esconde o tooltip após 5 segundos
    setTimeout(() => setShowTooltip(false), 5000);
  };

  // Efeito para rolar para a última mensagem quando uma nova for adicionada
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isLoading) return;
    
    // Adiciona a mensagem do usuário
    const newMessage = {
      id: Date.now(),
      text: trimmedMessage,
      sender: 'user' as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    setIsLoading(true);
    
    try {
      const response = await getBotResponse(trimmedMessage);
      const botResponse = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot' as const,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Erro ao obter resposta do bot:', error);
      const errorResponse = {
        id: Date.now() + 1,
        text: 'Desculpe, ocorreu um erro ao processar sua mensagem. Você pode tentar novamente ou entrar em contato pelo telefone (11) 1234-5678.',
        sender: 'bot' as const,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };


  // Função para gerar respostas usando a API da OpenAI
  const getBotResponse = async (userMessage: string, attempt: number = 1): Promise<string> => {
    // Verifica se a chave da API está configurada
    const apiKey = import.meta.env.VITE_CONTADOR1_API_KEY;
    if (!apiKey || apiKey === 'sua_chave_da_api_aqui') {
      console.error('Chave da API (contador1) não configurada');
      return '⚠️ Chave da API não configurada. Por favor, adicione sua chave da OpenAI no arquivo .env.local como VITE_CONTADOR1_API_KEY=sua_chave_aqui';
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `Você é um assistente virtual de um escritório de contabilidade chamado "Contador Digital". 
              Seu objetivo é ajudar os clientes com informações sobre serviços contábeis, tirar dúvidas e direcionar para os canais de atendimento quando necessário.
              Seja prestativo, profissional e mantenha as respostas claras e objetivas.
              
              Informações sobre o escritório:
              - Nome: Contador Digital
              - Telefone: (11) 1234-5678
              - WhatsApp: (11) 98765-4321
              - E-mail: contato@contadordigital.com.br
              - Horário de atendimento: Segunda a Sexta, das 9h às 18h | Sábados, das 9h às 12h
              
              Serviços oferecidos:
              - Abertura de empresas
              - Escrituração contábil
              - Imposto de Rende
              - Folha de pagamento
              - Contabilidade para MEI
              - Consultoria tributária
              - Legalização de empresas
              - Planejamento financeiro
              - Análise de demonstrações financeiras
              - Consultoria financeira empresarial
              
              Mantenha as respostas em português do Brasil e seja sempre educado.`
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Erro na resposta da API:', errorData);
        
        // Tratamento específico para erros de autenticação
        if (response.status === 401) {
          return '🔑 Erro de autenticação: Chave da API inválida ou expirada. Por favor, verifique sua chave da OpenAI.';
        }
        
        // Tratamento para cota excedida
        if (errorData.error?.code === 'insufficient_quota') {
          return '⚠️ Nossa cota de uso da API foi atingida. Por favor, entre em contato com o suporte ou tente novamente mais tarde.';
        }
        
        // Tratamento para limite de taxa excedido
        if (response.status === 429) {
          // Se for a primeira tentativa, tenta novamente após um atraso
          if (attempt <= 3) {
            const delay = Math.min(1000 * Math.pow(2, attempt), 10000); // Atraso exponencial, máximo 10s
            await new Promise(resolve => setTimeout(resolve, delay));
            return getBotResponse(userMessage, attempt + 1);
          }
          return '⚠️ Estamos com muitas solicitações no momento. Por favor, aguarde alguns instantes e tente novamente.';
        }
        
        // Tratamento para outros erros
        return `❌ Ocorreu um erro ao processar sua solicitação (${response.status}). Por favor, tente novamente mais tarde.`;
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || 'Desculpe, não consegui processar sua mensagem. Poderia reformular, por favor?';
    } catch (error) {
      console.error('Erro ao chamar a API da OpenAI:', error);
      
      // Mensagens mais amigáveis para o usuário com base no tipo de erro
      if (error instanceof TypeError) {
        return '🌐 Erro de conexão. Verifique sua conexão com a internet e tente novamente.';
      }
      
      if (error instanceof Error && error.message.includes('Failed to fetch')) {
        return '🔌 Não foi possível conectar ao servidor. Verifique sua conexão com a internet.';
      }
      
      // Mensagem genérica para outros erros
      return '⚠️ Ocorreu um erro inesperado. Por favor, tente novamente mais tarde ou entre em contato com o suporte.';
    }

    // Código removido - usando apenas a API da OpenAI
  };

  // Não renderiza nada até verificar o estado do localStorage
  if (hasOpenedBefore === null) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-end flex-col">
      {isOpen ? (
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-80 flex flex-col" style={{ height: '600px' }}>
          {/* Cabeçalho do Chat */}
          <div className="bg-green-600 p-4 flex justify-between items-center">
            <h3 className="text-white font-medium">Assistente Virtual</h3>
            <button 
              onClick={handleCloseChat}
              className="text-white hover:text-gray-200 focus:outline-none"
              aria-label="Fechar chat"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Área de Mensagens */}
          <div 
            ref={chatContainerRef}
            className="flex-1 p-4 overflow-y-auto bg-gray-50"
          >
            <div className="space-y-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] p-3 rounded-2xl ${
                      msg.sender === 'user' 
                        ? 'bg-green-600 text-white rounded-br-none' 
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <div className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-green-200' : 'text-gray-400'}`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Área de Digitação */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-3 bg-white">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                aria-label="Digite sua mensagem"
              />
              <button
                type="submit"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
                disabled={isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">Digite sua dúvida e pressione Enter para enviar</p>
          </form>
        </div>
      ) : (
        <div className="flex items-center">
          {showTooltip && (
            <div className="bg-white text-gray-800 text-sm px-3 py-2 rounded-lg shadow-md mr-3 mb-2 animate-fade-in">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>Tire suas dúvidas com o ChatBot!</span>
              </div>
              <div className="absolute right-3 -bottom-1 w-3 h-3 transform rotate-45 bg-white"></div>
            </div>
          )}
          <button
            onClick={handleOpenChat}
            className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-110"
            aria-label="Abrir chat"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-7 w-7" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
            />
          </svg>
          </button>
        </div>
      )}
    </div>
  );
}
