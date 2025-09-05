import axios from 'axios';
import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';
// Tipos para usuario
interface User {
  id: string;
  name: string;
  email: string;
  token?: string; // JWT o similar cuando se conecte al backend
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
    };

    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
};
