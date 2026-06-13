import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginApi, registerApi, logoutApi, getMeApi, updateProfileApi, type UpdateProfilePayload } from '../api/auth.api';

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  avatarUrl?: string | null;
  bio?: string;
  country?: string;
  githubUrl?: string;
  createdAt?: string | null;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, username: string, email: string, password: string, avatarUrl: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateProfile: (payload: UpdateProfilePayload) => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('auth_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await getMeApi();
        if (data.success && data.user) {
          setUser(data.user);
          localStorage.setItem('auth_user', JSON.stringify(data.user));
        } else {
          setUser(null);
          localStorage.removeItem('auth_user');
        }
      } catch (error: any) {
        // Only clear the session if it is an explicit authentication error (401/403)
        // This prevents logging the user out on transient network errors or temporary server down-time
        const isAuthError = error.response && (error.response.status === 401 || error.response.status === 403);
        if (isAuthError) {
          setUser(null);
          localStorage.removeItem('auth_user');
        } else {
          console.warn("Authentication check failed due to network or server error, retaining cached session:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await loginApi(email, password);
      if (data.success && data.user) {
        setUser(data.user);
        localStorage.setItem('auth_user', JSON.stringify(data.user));
      }
    } catch (error) {
      setUser(null);
      localStorage.removeItem('auth_user');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, username: string, email: string, password: string, avatarUrl: string) => {
    setIsLoading(true);
    try {
      const data = await registerApi(name, username, email, password, avatarUrl);
      if (data.success && data.user) {
        setUser(data.user);
        localStorage.setItem('auth_user', JSON.stringify(data.user));
      }
    } catch (error) {
      setUser(null);
      localStorage.removeItem('auth_user');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await logoutApi();
    } catch (error) {
      console.error('Logout API failed:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('auth_user');
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    const data = await getMeApi();
    if (data.success && data.user) {
      setUser(data.user);
      localStorage.setItem('auth_user', JSON.stringify(data.user));
    }
  };

  const updateProfile = async (payload: UpdateProfilePayload) => {
    const data = await updateProfileApi(payload);
    if (data.success && data.user) {
      setUser(data.user);
      localStorage.setItem('auth_user', JSON.stringify(data.user));
      return data.user;
    }
    throw new Error('Failed to update profile');
  };

  return (
    <AuthContext value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      refreshUser,
      updateProfile,
    }}>
      {children}
    </AuthContext>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
