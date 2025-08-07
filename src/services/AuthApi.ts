import axios from "axios";

axios.defaults.withCredentials = true; 
const API_URL = "http://localhost:3000/auth"; 

// Register user
export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Terjadi kesalahan saat mendaftar";
  }
};

// Login user
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    if (response.data.success && response.data.token) {
      const { token, user } = response.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      return response.data;  
    } else {
      throw new Error("Login failed: Token or user data missing");
    }
  } catch (error: any) {
    console.error("Login error:", error);
    throw error.response?.data || "Terjadi kesalahan saat login";
  }
};

// Get user profile
export const getUserProfile = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Terjadi kesalahan saat mengambil profil";
  }
};

// Verify user email
export const verifyEmail = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/verify/${token}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Terjadi kesalahan saat verifikasi email";
  }
};

// Mengarahkan pengguna ke halaman login Google
export const googleLogin = () => {
  // Langsung navigasi ke endpoint Express untuk memulai alur OAuth
  window.location.href = `${API_URL}/google`;
};

// Menangani callback dari Google OAuth
export const handleGoogleCallback = (token: string) => {
  // Simpan token yang didapat dari URL callback ke localStorage
  localStorage.setItem("token", token);
  // Kamu mungkin juga ingin menyimpan data user di sini jika server mengirimkannya
  console.log("Google login successful: Token stored");
};



export const getUserStats = async (userId: string, token: string) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;  // Return the response data
  } catch (error: any) {
    throw error.response?.data || "Terjadi kesalahan saat mengambil stats user";
  }
};
