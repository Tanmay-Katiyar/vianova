
import { useEffect, useState, createContext, useContext } from 'react';

// Define types for our authentication
export interface User {
  id: string;
  email: string;
  name: string;
  photoURL: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

// Create authentication context
export const AuthContext = createContext<AuthContextType | null>(null);

// Mock Google Auth implementation
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth provider implementation
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user data");
      }
    }
    setLoading(false);
  }, []);

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      // Mock Google Authentication
      // In a real implementation, this would interact with Google OAuth API
      const mockUser = {
        id: 'google-' + Math.random().toString(36).substring(2, 9),
        email: 'user@example.com',
        name: 'Test User',
        photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop'
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
      console.error("Sign in error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      setLoading(true);
      localStorage.removeItem('user');
      setUser(null);
    } catch (err: any) {
      setError(err.message || 'Failed to sign out');
      console.error("Sign out error:", err);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    signInWithGoogle,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
