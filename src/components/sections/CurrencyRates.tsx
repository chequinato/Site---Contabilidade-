import { useEffect, useState } from 'react';
import { FaDollarSign, FaEuroSign, FaSyncAlt } from 'react-icons/fa';

interface ExchangeRate {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
}

const CurrencyRates = () => {
  const [rates, setRates] = useState<{
    USD: ExchangeRate | null;
    EUR: ExchangeRate | null;
  }>({ USD: null, EUR: null });
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const fetchRates = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Usando a API do AwesomeAPI para cotações
      const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL');
      
      if (!response.ok) {
        throw new Error('Não foi possível obter as cotações no momento');
      }
      
      const data = await response.json();
      
      setRates({
        USD: data.USDBRL,
        EUR: data.EURBRL
      });
      
      setLastUpdated(new Date().toLocaleTimeString('pt-BR'));
    } catch (err) {
      console.error('Erro ao buscar cotações:', err);
      setError('Não foi possível carregar as cotações. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    
    // Atualiza a cada 5 minutos
    const interval = setInterval(fetchRates, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value: string) => {
    return parseFloat(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 4
    });
  };

  const formatPercentage = (value: string) => {
    const num = parseFloat(value);
    return `${num > 0 ? '+' : ''}${num.toFixed(2)}%`;
  };

  return (
    <section id="cotacoes" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1 text-sm font-semibold text-primary-700 bg-primary-100 rounded-full mb-4">
            Cotações em Tempo Real
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Acompanhe as Cotações
          </h2>
          <p className="text-lg text-gray-600">
            Dólar e Euro atualizados em tempo real
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={fetchRates}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <FaSyncAlt className="mr-2" /> Tentar novamente
            </button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dólar */}
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary-600">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                    <FaDollarSign className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Dólar Americano</h3>
                    <p className="text-gray-500">USD/BRL</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Compra:</span>
                    <span className="font-semibold">{formatCurrency(rates.USD?.bid || '0')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Venda:</span>
                    <span className="font-semibold">{formatCurrency(rates.USD?.ask || '0')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Variação:</span>
                    <span className={`font-semibold ${parseFloat(rates.USD?.pctChange || '0') >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatPercentage(rates.USD?.pctChange || '0')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Euro */}
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                    <FaEuroSign className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Euro</h3>
                    <p className="text-gray-500">EUR/BRL</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Compra:</span>
                    <span className="font-semibold">{formatCurrency(rates.EUR?.bid || '0')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Venda:</span>
                    <span className="font-semibold">{formatCurrency(rates.EUR?.ask || '0')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Variação:</span>
                    <span className={`font-semibold ${parseFloat(rates.EUR?.pctChange || '0') >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatPercentage(rates.EUR?.pctChange || '0')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Atualizado em: {lastUpdated}</p>
              <button
                onClick={fetchRates}
                className="mt-2 inline-flex items-center text-primary-600 hover:text-primary-800 transition-colors"
                disabled={isLoading}
              >
                <FaSyncAlt className={`mr-1 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? 'Atualizando...' : 'Atualizar agora'}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CurrencyRates;
