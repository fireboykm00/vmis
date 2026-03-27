import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { authService } from "@/services/authService";
import type { User } from "@/types";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    const response = await authService.login({ username, password });
    
    const userData: User = { 
      id: response.id, 
      username: response.username, 
      email: response.email, 
      fullName: response.fullName, 
      roles: response.roles 
    };
    
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(userData));
    
    setToken(response.token);
    setUser(userData);
  };

  const register = async (username: string, email: string, password: string, fullName: string) => {
    const response = await authService.register({ username, email, password, fullName });
    
    const userData: User = { 
      id: response.id, 
      username: response.username, 
      email: response.email, 
      fullName: response.fullName, 
      roles: response.roles 
    };
    
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(userData));
    
    setToken(response.token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}