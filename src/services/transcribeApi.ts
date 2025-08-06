import axios from "axios";

axios.defaults.withCredentials = true;
const API_URL = "http://localhost:3000/transcribe";

// Transcribe YouTube URL
export const transcribeYouTube = async (
  url: string,
  userId: string,
  token: string
) => {
  try {
    const response = await axios.post(
      `${API_URL}/youtube`,
      { url, userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw (
      error.response?.data ||
      "Terjadi kesalahan saat mentranskrip video YouTube"
    );
  }
};

// Transcribe Audio File
export const transcribeAudio = async (file: File, token: string) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${API_URL}/audio`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw (
      error.response?.data || "Terjadi kesalahan saat mentranskrip file audio"
    );
  }
};

// Transcribe Video File
export const transcribeVideo = async (file: File, token: string) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${API_URL}/video`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw (
      error.response?.data || "Terjadi kesalahan saat mentranskrip file video"
    );
  }
};

export const getUserTranscriptions = async ({
  token,
}: {
  userId: string;
  token: string;
}) => {
  try {
    const response = await axios.get(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw (
      error.response?.data || "Terjadi kesalahan saat mengambil data transkrip"
    );
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
    throw (
      error.response?.data ||
      "Terjadi kesalahan saat mengambil detail transkrip"
    );
  }
};

export const deleteTranscription = async (id: string, token: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Terjadi kesalahan saat mengahapus transkrip";
  }
};

export const updateTranscription = async (
  id: string,
  title: string,
  summary: string,
  token: string
) => {
  try {
    const response = await axios.put(
      `${API_URL}/${id}`,
      { title, summary },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw (
      error.response?.data || "Terjadi kesalahan saat memperbarui transkrip"
    );
  }
};

export const askQuestion = async (
  transcriptionId: string,
  question: string,
  token: string
) => {
  try {
    const response = await axios.post(
      `${API_URL}/${transcriptionId}/ask`,
      { question },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Terjadi kesalahan saat bertanya";
  }
};

export const getChatHistory = async (transcriptionId: string, token: string) => {
  try {
    const response = await axios.get(`${API_URL}/${transcriptionId}/ask`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      return response.data.history;
    } else {
      throw new Error("No history found");
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat mengambil history chat:", error);
    throw error; 
  }
};

export const generateQuiz = async (transcriptionId: string, token: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/${transcriptionId}/quiz`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Terjadi kesalahan saat generate quiz";
  }
};

export const getQuiz = async (transcriptionId: string, token: string) => {
  try {
    const response = await axios.get(`${API_URL}/${transcriptionId}/quiz`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Terjadi kesalahan saat mengambil quiz";
  }
};


interface QuizAnswer {
  selected: string;
}

export const submitQuiz = async (
  transcriptionId: string,
  answers: QuizAnswer[],
  token: string
) => {
  try {
    const response = await axios.post(
      `${API_URL}/${transcriptionId}/submit_quiz`,
      { answers },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Terjadi kesalahan saat mengirim jawaban quiz";
  }
};


// Function to download transcription PDF
export const downloadTranscriptionPDF = async (transcriptionId: string, token: string) => {
  try {
    // Send GET request to backend to fetch the PDF
    const response = await axios.get(`${API_URL}/${transcriptionId}/download`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/pdf",
      },
      responseType: 'arraybuffer',  
    });

    const blob = new Blob([response.data], { type: 'application/pdf' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${transcriptionId}.pdf`; 
    link.click(); 
  } catch (error: any) {
    throw error.response?.data || "Terjadi kesalahan saat mengunduh PDF transkrip";
  }
};
