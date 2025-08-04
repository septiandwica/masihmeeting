import React, { createContext, useContext, useState, useEffect } from "react";
import {
  loginUser,
  registerUser,
  googleOAuth,
  verifyEmail as verifyEmailApi,
  getUserProfile as getUserProfileApi,
} from "../services/AuthApi";

interface User {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
  token?: string;
  role: string;
  avatar: string;
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
  fetchUserProfile: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    if (savedUser && savedToken) {
      const parsedUser = JSON.parse(savedUser);
      setUser({ ...parsedUser, token: savedToken }); 
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
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
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

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await registerUser(name, email, password);
      if (response.success) {
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

  const verifyEmail = async (token: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await verifyEmailApi(token);
      if (response.success && user) {
        user.isVerified = true;
        setUser({ ...user });
        localStorage.setItem("user", JSON.stringify(user));
      }
      setIsLoading(false);
      return response.success;
    } catch (error) {
      console.error("Email verification failed:", error);
      setIsLoading(false);
      return false;
    }
  };

  const resendVerificationEmail = async (): Promise<boolean> => {
    try {
      console.log("Resend verification email (fake)");
      return true;
    } catch (error) {
      console.error("Fake resend verification email failed:", error);
      return false;
    }
  };

  const googleLogin = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await googleOAuth();
      if (response.success) {
        const { user, token } = response;
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
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

  const fetchUserProfile = async (): Promise<void> => {
    setIsLoading(true);
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      try {
        const profileData = await getUserProfileApi(savedToken);
        if (profileData) {
          setUser({ ...profileData, token: savedToken });
          localStorage.setItem(
            "user",
            JSON.stringify({ ...profileData, token: savedToken })
          );
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        verifyEmail,
        resendVerificationEmail,
        googleLogin,
        fetchUserProfile,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
