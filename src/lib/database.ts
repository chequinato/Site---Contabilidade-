import { supabase } from './supabase';

// Tipos para o sistema contábil
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client';
  created_at: string;
  updated_at: string;
}

export interface Company {
  id: string;
  name: string;
  cnpj: string;
  email: string;
  phone?: string;
  address?: string;
  status: 'active' | 'pending' | 'inactive';
  monthly_revenue?: number;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  method: string;
  document: string;
  status: 'completed' | 'pending';
  date: string;
  company_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface TaxDeadline {
  id: string;
  name: string;
  amount: string;
  deadline: string;
  status: 'urgent' | 'warning' | 'normal';
  company_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

// Funções de autenticação
export const signUp = async (email: string, password: string, name: string, companyName?: string, cnpj?: string) => {
  try {
    // 1. Criar usuário no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role: 'client'
        }
      }
    });

    if (authError) throw authError;

    if (authData.user) {
      // 2. Criar perfil do usuário na tabela users
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert([
          {
            id: authData.user.id,
            email: authData.user.email!,
            name,
            role: 'client'
          }
        ])
        .select()
        .single();

      if (userError) throw userError;

      // 3. Se for cliente, criar a empresa
      if (companyName && cnpj) {
        const { error: companyError } = await supabase
          .from('companies')
          .insert([
            {
              name: companyName,
              cnpj,
              email,
              status: 'pending',
              user_id: authData.user.id
            }
          ]);

        if (companyError) throw companyError;
      }

      return { success: true, data: userData };
    }
  } catch (error) {
    console.error('Erro no cadastro:', error);
    return { success: false, error };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    // Buscar dados do usuário na tabela users
    if (data.user) {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (userError) throw userError;

      return { success: true, data: userData };
    }
  } catch (error) {
    console.error('Erro no login:', error);
    return { success: false, error };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Erro no logout:', error);
    return { success: false, error };
  }
};

export const getCurrentUser = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return userData;
    }
    return null;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return null;
  }
};

// Funções CRUD para Empresas
export const getCompanies = async (userId?: string) => {
  try {
    let query = supabase.from('companies').select('*');
    
    if (userId) {
      query = query.eq('user_id', userId);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Erro ao buscar empresas:', error);
    return [];
  }
};

export const createCompany = async (company: Omit<Company, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const { data, error } = await supabase
      .from('companies')
      .insert([company])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erro ao criar empresa:', error);
    throw error;
  }
};

export const updateCompany = async (id: string, company: Partial<Company>) => {
  try {
    const { data, error } = await supabase
      .from('companies')
      .update(company)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erro ao atualizar empresa:', error);
    throw error;
  }
};

export const deleteCompany = async (id: string) => {
  try {
    const { error } = await supabase
      .from('companies')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Erro ao excluir empresa:', error);
    throw error;
  }
};

// Funções CRUD para Transações
export const getTransactions = async (userId?: string, companyId?: string) => {
  try {
    let query = supabase.from('transactions').select('*');
    
    if (userId) {
      query = query.eq('user_id', userId);
    }
    
    if (companyId) {
      query = query.eq('company_id', companyId);
    }
    
    const { data, error } = await query.order('date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Erro ao buscar transações:', error);
    return [];
  }
};

export const createTransaction = async (transaction: Omit<Transaction, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .insert([transaction])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erro ao criar transação:', error);
    throw error;
  }
};

export const updateTransaction = async (id: string, transaction: Partial<Transaction>) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .update(transaction)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erro ao atualizar transação:', error);
    throw error;
  }
};

export const deleteTransaction = async (id: string) => {
  try {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Erro ao excluir transação:', error);
    throw error;
  }
};

// Funções CRUD para Prazos Tributários
export const getTaxDeadlines = async (userId?: string, companyId?: string) => {
  try {
    let query = supabase.from('tax_deadlines').select('*');
    
    if (userId) {
      query = query.eq('user_id', userId);
    }
    
    if (companyId) {
      query = query.eq('company_id', companyId);
    }
    
    const { data, error } = await query.order('deadline', { ascending: true });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Erro ao buscar prazos tributários:', error);
    return [];
  }
};

export const createTaxDeadline = async (taxDeadline: Omit<TaxDeadline, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const { data, error } = await supabase
      .from('tax_deadlines')
      .insert([taxDeadline])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erro ao criar prazo tributário:', error);
    throw error;
  }
};

export const updateTaxDeadline = async (id: string, taxDeadline: Partial<TaxDeadline>) => {
  try {
    const { data, error } = await supabase
      .from('tax_deadlines')
      .update(taxDeadline)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erro ao atualizar prazo tributário:', error);
    throw error;
  }
};

export const deleteTaxDeadline = async (id: string) => {
  try {
    const { error } = await supabase
      .from('tax_deadlines')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Erro ao excluir prazo tributário:', error);
    throw error;
  }
};
