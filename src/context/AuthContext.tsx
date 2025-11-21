import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { storage } from '../utils/storage';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  signup: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await storage.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    const foundUser = await storage.findUser(username);
    if (foundUser && foundUser.password === password) {
      setUser(foundUser);
      await storage.setCurrentUser(foundUser);
      return true;
    }
    return false;
  };

  const signup = async (username: string, password: string): Promise<boolean> => {
    const existingUser = await storage.findUser(username);
    if (existingUser) {
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      username,
      password,
      createdAt: new Date().toISOString(),
    };

    await storage.addUser(newUser);
    setUser(newUser);
    await storage.setCurrentUser(newUser);
    return true;
  };

  const logout = async () => {
    setUser(null);
    await storage.setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
