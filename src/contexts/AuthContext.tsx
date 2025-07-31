import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, googleOAuth, verifyEmail as verifyEmailApi, getUserProfile } from '../services/AuthApi'; 

interface User {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  googleLogin: () => Promise<boolean>;
  verifyEmail: (token: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  resendVerificationEmail: () => Promise<boolean>; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await loginUser(email, password);
      if (response.success) {
        const { user, token } = response;
        setUser(user);
        setToken(token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoading(false);
      return false;
    }
  };

  // Register user
const register = async (name: string, email: string, password: string): Promise<boolean> => {
  setIsLoading(true);
  try {
    const response = await registerUser(name, email, password);
    if (response.success) {
      // Only redirect to login after successful registration
      setIsLoading(false);
      return true;
    } else {
      setIsLoading(false);
      return false;
    }
  } catch (error) {
    console.error("Registration failed:", error);
    setIsLoading(false);
    return false;
  }
};


  // Verify email
    const verifyEmail = async (token: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await verifyEmailApi(token);  
      if (response.success) {
        if (user) {
          user.isVerified = true;
          setUser({ ...user });
          localStorage.setItem('user', JSON.stringify(user)); 
        }
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error("Email verification failed:", error);
      setIsLoading(false);
      return false;
    }
  };

const resendVerificationEmail = async (): Promise<boolean> => {
  try {
    // Simulating a successful resend response
    console.log("Resend verification email (fake)");
    return true;
  } catch (error) {
    console.error("Fake resend verification email failed:", error);
    return false;
  }
};

  // Google Login
  const googleLogin = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await googleOAuth();  // Call googleOAuth API function
      if (response.success) {
        const { user, token } = response;
        setUser(user);
        setToken(token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error("Google login failed:", error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, verifyEmail, resendVerificationEmail, googleLogin, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;