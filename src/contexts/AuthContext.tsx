import axios from 'axios';
import { createContext, useState, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
// Tipos para usuario
interface User {
  id: string;
  name: string;
  email: string;
  token?: string; // JWT o similar cuando se conecte al backend
  role?: string; // 'admin' o 'user'
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;

  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Simulación de login (luego aquí va la llamada al backend con axios)
  const login = async (email: string, password: string) => {
    const response = await axios.post('http://localhost:4000/api/login', {
      email,
      password,
    });

    const userData: User = {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
      token: response.data.token,
      role: response.data.role,
    };

    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAuthenticated = !!user;

  const contextValue = useMemo(() => ({ user, login, logout, isAuthenticated }), [user, isAuthenticated, login, logout]);
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
};
