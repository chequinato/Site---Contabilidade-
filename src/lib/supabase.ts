import { createClient } from '@supabase/supabase-js';

// Verificação das variáveis de ambiente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('VITE_SUPABASE_URL não está definido no arquivo .env');
}

if (!supabaseAnonKey) {
  throw new Error('VITE_SUPABASE_ANON_KEY não está definido no arquivo .env');
}

// Configuração do cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true
  }
});

// Interface para o tipo de retorno da função
export interface SubscriptionResult {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}

// Função para adicionar um email à lista de newsletter
export const subscribeToNewsletter = async (email: string): Promise<SubscriptionResult> => {
  try {
    // Validação básica do email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return {
        success: false,
        message: 'Por favor, insira um endereço de e-mail válido.'
      };
    }

    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([
        { 
          email: email.toLowerCase().trim(),
          subscribed_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      // Verifica se o erro é de duplicação de email
      if (error.code === '23505') {
        return {
          success: true,
          message: 'Este e-mail já está inscrito em nossa newsletter.',
          data: { email }
        };
      }
      
      throw error;
    }

    return {
      success: true,
      message: 'Inscrição realizada com sucesso! Obrigado por assinar nossa newsletter.',
      data: data?.[0] || { email }
    };
  } catch (error) {
    console.error('Erro ao inscrever na newsletter:', error);
    return {
      success: false,
      message: 'Ocorreu um erro ao processar sua inscrição. Por favor, tente novamente mais tarde.',
      error: error
    };
  }
};
