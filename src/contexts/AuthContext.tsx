import React, { createContext, useContext, useState, useEffect } from 'react';
import { signIn, signUp, signOut, getCurrentUser } from '@/lib/database';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAdmin: () => boolean;
  isClient: () => boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  companyName?: string;
  cnpj?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Erro ao verificar usuário:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const result = await signIn(email, password);
      if (result?.success && result?.data) {
        setUser(result.data);
        return true;
      }
      if (result?.error) throw result.error;
      return false;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
  setIsLoading(true);
  try {
    if (userData.password !== userData.confirmPassword) {
      throw new Error('As senhas não coincidem');
    }

    const result = await signUp(
      userData.email,
      userData.password,
      userData.name,
      userData.companyName,
      userData.cnpj
    );

    if (result.success && result.data) {
      setUser(result.data.user); // já inclui company se tiver
      return true;
    }

    if (result.error) throw result.error;
    return false;
  } catch (error: any) {
    console.error('Erro no cadastro:', error);
    throw error;
  } finally {
    setIsLoading(false);
  }
};


  const logout = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error('Erro no logout:', error);
      setUser(null);
    }
  };

  const isAdmin = () => user?.role === 'admin';
  const isClient = () => user?.role === 'client';

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isLoading,
        isAdmin,
        isClient,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
