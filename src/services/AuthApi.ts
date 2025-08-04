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
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    });
    return response.data;
  } catch (error: any) {
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


// Google OAuth (Manual Test)
export const googleOAuth = async () => {
  try {
    const response = await axios.get(`${API_URL}/google`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Terjadi kesalahan saat login menggunakan Google";
  }
};
