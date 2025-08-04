import axios from "axios";

axios.defaults.withCredentials = true; 
const API_URL = "http://localhost:3000/transcribe";

// Transcribe YouTube URL
export const transcribeYouTube = async (url: string, userId: string, token: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/youtube`, 
      { url, userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,  
        }
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Terjadi kesalahan saat mentranskrip video YouTube";
  }
};

// Transcribe Audio File
export const transcribeAudio = async (file: File, token: string) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(
      `${API_URL}/audio`, 
      formData, 
      {
        headers: {
          "Content-Type": 'multipart/form-data',
          Authorization: `Bearer ${token}`, 
        }
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Terjadi kesalahan saat mentranskrip file audio";
  }
};

// Transcribe Video File
export const transcribeVideo = async (file: File, token: string) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(
      `${API_URL}/video`, 
      formData, 
      {
        headers: {
          "Content-Type": 'multipart/form-data',
          Authorization: `Bearer ${token}`, 
        }
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Terjadi kesalahan saat mentranskrip file video";
  }
};

export const getUserTranscriptions = async ({ token }: { userId: string, token: string }) => {
  try {
    const response = await axios.get(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Terjadi kesalahan saat mengambil data transkrip";
  }
};

// Get transcription details by ID
export const getTranscriptionDetails = async (id: string, token: string) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Terjadi kesalahan saat mengambil detail transkrip";
  }
};
