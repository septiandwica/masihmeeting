import React, { createContext, useContext, useState, useEffect } from "react";
import {
  loginUser,
  registerUser,
  googleLogin as startGoogleLogin,
  verifyEmail as verifyEmailApi,
  getUserProfile as getUserProfileApi,
} from "../services/authApi";

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
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  googleLogin: () => void;
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
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      try {
        let parsedUser = JSON.parse(savedUser);
        
        if (parsedUser && parsedUser.user && typeof parsedUser.user === 'object' && parsedUser.user.id) {
          parsedUser = parsedUser.user;
        }

        if (parsedUser && parsedUser.id) {
          setUser({ ...parsedUser, token: savedToken });
        } else {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setUser(null);
        }
      } catch (error) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
      }
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await loginUser(email, password);
      if (response.success) {
        const { user: userData, token } = response; 
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error) {
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
        console.log("Registrasi berhasil.");
        return true;
      } else {
        setIsLoading(false);
        console.log("Registrasi gagal: Respons tidak berhasil.");
        return false;
      }
    } catch (error) {
      console.error("Registrasi gagal:", error);
      setIsLoading(false);
      return false;
    }
  };

  const verifyEmail = async (token: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await verifyEmailApi(token);
      if (response.success && user) {
        const updatedUser = { ...user, isVerified: true };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        console.log("Verifikasi email berhasil.");
      }
      setIsLoading(false);
      return response.success;
    } catch (error) {
      console.error("Verifikasi email gagal:", error);
      setIsLoading(false);
      return false;
    }
  };

  const resendVerificationEmail = async (): Promise<boolean> => {
    try {
      console.log("Mengirim ulang email verifikasi (simulasi)");
      return true;
    } catch (error) {
      console.error("Gagal mengirim ulang email verifikasi (simulasi):", error);
      return false;
    }
  };

  const googleLogin = () => {
    console.log("Memulai alur login Google...");
    startGoogleLogin();
  };

  const fetchUserProfile = async (): Promise<void> => {
    setIsLoading(true);
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      try {
        const profileData = await getUserProfileApi(savedToken); 
        
        if (profileData && profileData.user) { 
          const actualUser = { ...profileData.user, token: savedToken };
          setUser(actualUser); 
          localStorage.setItem(
            "user",
            JSON.stringify(actualUser)
          );
        } else {
          setUser(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }
      } catch (error) {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
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
        setUser,
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
