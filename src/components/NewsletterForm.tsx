import { useState } from 'react';
import { subscribeToNewsletter, type SubscriptionResult } from '../lib/supabase';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setStatus('loading');
    setMessage('');

    const result: SubscriptionResult = await subscribeToNewsletter(email);
    
    if (result.success) {
      setStatus('success');
      setMessage(result.message);
      
      // Limpar o campo de email apenas se for um novo cadastro
      if (result.message.includes('sucesso')) {
        setEmail('');
      }
      
      // Resetar mensagem após 5 segundos
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    } else {
      setStatus('error');
      setMessage(result.message || 'Ocorreu um erro ao processar sua inscrição.');
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 mb-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">Assine Nossa Newsletter</h3>
          <p className="text-gray-400">Receba dicas e atualizações diretamente no seu e-mail.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu melhor e-mail"
            className="flex-grow px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            disabled={status === 'loading'}
            required
          />
          <button
            type="submit"
            className={`${
              status === 'loading'
                ? 'bg-primary-400 cursor-not-allowed'
                : 'bg-primary-600 hover:bg-primary-700'
            } text-white font-semibold py-3 px-6 rounded-lg transition-colors whitespace-nowrap flex items-center justify-center`}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processando...
              </>
            ) : (
              'Assinar'
            )}
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 p-3 rounded-lg text-center ${
              status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterForm;
