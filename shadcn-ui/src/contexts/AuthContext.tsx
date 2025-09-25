import { User } from '@/types';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('attendance_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo credentials
    const demoUsers: User[] = [
      {
        id: 'admin-1',
        email: 'admin@company.com',
        role: 'admin'
      },
      {
        id: 'emp-1',
        email: 'john@company.com',
        role: 'employee',
        employeeId: '1'
      },
      {
        id: 'emp-2',
        email: 'jane@company.com',
        role: 'employee',
        employeeId: '2'
      },
      {
        id: 'emp-3',
        email: 'jane@company.com',
        role: 'employee',
        employeeId: '3'
      },
      {
        id: 'emp-4',
        email: 'akhil@company.com',
        role: 'employee',
        employeeId: '4'
      },
      {
        id: 'emp-5',
        email: 'ronit@company.com',
        role: 'employee',
        employeeId: '5'
      },
      {
        id: 'emp-6',
        email: 'smith@company.com',
        role: 'employee',
        employeeId: '6'
      },
      {
        id: 'emp-7',
        email: 'rohan@company.com',
        role: 'employee',
        employeeId: '7'
      }
    ];

    const foundUser = demoUsers.find(u => u.email === email);
    
    if (foundUser && password === 'password') {
      setUser(foundUser);
      localStorage.setItem('attendance_user', JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('attendance_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};