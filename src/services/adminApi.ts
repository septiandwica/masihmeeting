import axios from "axios";

const API_URL = "http://localhost:3000/users";

// Helper function to get token from AuthContext instead of localStorage
const getAuthToken = (token: string | undefined) => {
  if (!token) {
    throw new Error("Token tidak ditemukan");
  }
  return token;
};

// Get all users
export const getAllUsers = async (token: string | undefined) => {
  try {
    const authToken = getAuthToken(token);
    const response = await axios.get(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching all users:", error);  // Log error for debugging
    throw error.response?.data || "Terjadi kesalahan saat mendapatkan semua user";
  }
};

// Get user by ID
export const getUserById = async (_id: string, token: string | undefined) => {
  if (!_id) {
    throw new Error("User ID tidak valid");
  }
  try {
    const authToken = getAuthToken(token);
    const response = await axios.get(`${API_URL}/${_id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching user with ID ${_id}:`, error);  // Log error for debugging
    throw error.response?.data || "Terjadi kesalahan saat mendapatkan user";
  }
};

// Update user
export const updateUser = async (
  _id: string,
  name: string,
  email: string,
  role: string,
  token: string | undefined
) => {
  if (!_id) {
    throw new Error("User ID tidak valid");
  }
  try {
    const authToken = getAuthToken(token);
    const response = await axios.put(
      `${API_URL}/${_id}`,
      {
        name,
        email,
        role,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(`Error updating user with ID/ ${_id}:`, error);  // Log error for debugging
    throw error.response?.data || "Terjadi kesalahan saat memperbarui user";
  }
};

// Delete user
export const deleteUser = async (_id: string, token: string | undefined) => {
  try {
    const authToken = getAuthToken(token);
    const response = await axios.delete(`${API_URL}/${_id}`, {  // Use _id here
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Terjadi kesalahan saat menghapus user";
  }
};
