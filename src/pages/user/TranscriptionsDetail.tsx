import React, { useState, useRef, useEffect } from "react";
import {
  Download,
  Trash2,
  FileText,
  Youtube,
  Mic,
  CheckCircle,
  XCircle,
  Clock,
  Send,
  ChevronLeft,
  ChevronRight,
  File,
  Bot,
  User,
  Loader2,
  AlertCircle,
  Share2,
  SquarePen,
} from "lucide-react";
import {
  getTranscriptionDetails,
  getUserTranscriptions,
  deleteTranscription,
  updateTranscription,
  askQuestion,
  getChatHistory,
  generateQuiz,
  getQuiz,
  submitQuiz,
} from "../../services/transcribeApi";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessage {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

interface TranscriptionData {
  _id: string;
  title: string;
  type: string;
  originalSource?: string;
  duration: number;
  transcription: string;
  summary: string;
  externalId: string;
  user: string;
  createdAt: string;
}

const MeetingDetailPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [transcriptionData, setTranscriptionData] =
    useState<TranscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [recentTranscriptions, setRecentTranscriptions] = useState<any[]>([]);
  const [totalFiles, setTotalTranscriptions] = useState<number>(0);
  const [isUpdateModalOpen, setisUpdateModalOpen] = useState(false);
  const [quizData, setQuizData] = useState<any[]>([]);
  const [quizLoading, setQuizLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [quizResult, setQuizResult] = useState<any | null>(null);

  const [updatedTitle, setUpdatedTitle] = useState(
    transcriptionData?.title || ""
  );
  const [updatedSummary, setUpdatedSummary] = useState(
    transcriptionData?.summary || ""
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);

  const meetingId = id || "";
  const token = user?.token || localStorage.getItem("token") || "";
  const [rows, setRows] = useState(10);

  // Fetch transcription data on component mount
  useEffect(() => {
    const fetchTranscriptionData = async () => {
      if (!meetingId || !token) {
        setError("Meeting ID or authentication token is missing");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await getTranscriptionDetails(meetingId, token);
        if (data && data.transcription) {
          setTranscriptionData(data.transcription);

          // Langsung ambil quiz jika ada
          try {
            const quizResponse = await getQuiz(data.transcription._id, token);

            if (quizResponse.mcqs && quizResponse.mcqs.length > 0) {
              const parsedMcqs = quizResponse.mcqs.map((item: any) => {
                const optionsArray = Object.entries(item.options).map(
                  ([key, value]) => ({ key, value })
                );
                return { ...item, options: optionsArray };
              });

              setQuizData(parsedMcqs);
              setUserAnswers(Array(parsedMcqs.length).fill(""));
              setQuizResult(data.transcription.quizResults || null);
            }
          } catch (err) {
            console.warn("Quiz belum dibuat, silakan generate.");
          }
        } else {
          setError("No transcription data available");
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch transcription data");
        console.error("Error fetching transcription:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTranscriptionData();
  }, [meetingId, token]);

  useEffect(() => {
    const updateRows = () => {
      if (window.innerWidth < 768) {
        setRows(10); // Mobile (less than 768px)
      } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setRows(20); // Tablet (between 768px and 1024px)
      } else {
        setRows(30); // Desktop (1024px and above)
      }
    };

    updateRows(); // Set initial rows based on the window size

    window.addEventListener("resize", updateRows); // Listen for window resizing

    return () => {
      window.removeEventListener("resize", updateRows); // Cleanup the event listener
    };
  }, []);
  useEffect(() => {
    // Fetch user transcriptions on mount
    if (user?.id) {
      const fetchTranscriptions = async () => {
        try {
          const response = await getUserTranscriptions({
            userId: user.id,
            token: user.token || "",
          });
          const transcriptions = response.transcriptions;
          const sortedTranscriptions = transcriptions.sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setRecentTranscriptions(sortedTranscriptions);
          setTotalTranscriptions(sortedTranscriptions.length);
        } catch (error) {
          console.error("Failed to fetch transcriptions:", error);
        }
      };
      fetchTranscriptions();
    }
  }, [user]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!transcriptionData?._id || !token) return;

      try {
        setChatLoading(true);
        const chatHistory = await getChatHistory(transcriptionData._id, token);

        const formattedMessages: ChatMessage[] = [];
        if (Array.isArray(chatHistory)) {
          chatHistory.forEach((chat: any, index: number) => {
            if (chat.question) {
              formattedMessages.push({
                id: `user-${index}`,
                type: "user",
                content: chat.question,
                timestamp: chat.created_at
                  ? new Date(chat.created_at)
                  : new Date(),
              });
            }

            if (chat.answer) {
              formattedMessages.push({
                id: `ai-${index}`,
                type: "ai",
                content: chat.answer,
                timestamp: chat.created_at
                  ? new Date(chat.created_at)
                  : new Date(),
              });
            }
          });
        }

        setChatMessages(formattedMessages);
      } catch (error: any) {
        console.error("Failed to fetch chat history:", error);
      } finally {
        setChatLoading(false);
      }
    };

    if (transcriptionData) {
      fetchChatHistory();
    }
  }, [transcriptionData, token]);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const openModal = () => {
    setUpdatedTitle(transcriptionData?.title || "");
    setUpdatedSummary(transcriptionData?.summary || "");
    setisUpdateModalOpen(true);
  };

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);
  const closeModal = () => {
    setisUpdateModalOpen(false);
  };
  const handleGenerateQuiz = async () => {
    if (!transcriptionData?._id || !token) return;

    try {
      setQuizLoading(true);
      await generateQuiz(transcriptionData._id, token);
      const quizResponse = await getQuiz(transcriptionData._id, token);

      const parsedMcqs = (quizResponse.mcqs || []).map((item: any) => {
        const optionsArray = Object.entries(item.options).map(
          ([key, value]) => ({
            key, // e.g., "a", "b", "c", "d"
            value, // e.g., "More students are absent..."
          })
        );
        return {
          ...item,
          options: optionsArray,
        };
      });

      setQuizData(parsedMcqs);
      setUserAnswers(Array(parsedMcqs.length).fill(""));
      setQuizResult(null);
      setCurrentQuestionIndex(0);
    } catch (error: any) {
      console.error("Gagal generate quiz:", error);
      alert("Gagal generate quiz");
    } finally {
      setQuizLoading(false);
    }
  };

  const handleSubmitQuiz = async () => {
    if (!transcriptionData?._id || !token) return;

    try {
      const formattedAnswers = userAnswers.map((answer) => ({
        selected: answer,
      }));
      const result = await submitQuiz(
        transcriptionData._id,
        formattedAnswers,
        token
      );
      setQuizResult(result.result);
    } catch (error: any) {
      console.error("Error submitting quiz:", error);
      alert("Gagal submit quiz");
    }
  };

  const handleDelete = async () => {
    if (!transcriptionData?._id || !token) return;

    try {
      const result = await deleteTranscription(transcriptionData._id, token);
      setError(null);
      setTranscriptionData(null);
      closeDeleteModal();
      navigate("/dashboard");
      alert("Transcription deleted successfully");
    } catch (error: any) {
      setError(error.message || "Failed to delete transcription");
      console.error("Delete error:", error);
    }
  };
  const handleUpdate = async () => {
    if (!transcriptionData?._id || !token) return;

    try {
      const updatedData = await updateTranscription(
        transcriptionData._id,
        updatedTitle,
        updatedSummary,
        token
      );
      setTranscriptionData(updatedData.transcription);
      closeModal();
      // navigate(`/dashboard/meeting/${transcriptionData._id}`)
      alert("Transcription updated successfully");
    } catch (error: any) {
      setError(error.message || "Failed to update transcription");
      console.error("Update error:", error);
    }
  };

  const handleSendMessage = async (
    e?: React.FormEvent | React.KeyboardEvent
  ) => {
    if (e) {
      e.preventDefault();
    }
    if (!message.trim() || isTyping || !transcriptionData?._id || !token)
      return;

    const currentMessage = message.trim();
    setMessage("");

    // Add user message immediately
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: "user",
      content: currentMessage,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Call the real API
      const response = await askQuestion(
        transcriptionData._id,
        currentMessage,
        token
      );

      // Add AI response
      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        type: "ai",
        content:
          response.answer.answer ||
          "I'm sorry, I couldn't process your question. Please try again.", // Access the answer field
        timestamp: isNaN(new Date(response.created_at).getTime())
          ? new Date() // If the date is invalid, fallback to the current date
          : new Date(response.created_at), // You can also use the created_at field if needed
      };

      setChatMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      console.error("Error asking question:", error);

      // Add error message
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        type: "ai",
        content:
          "I'm sorry, there was an error processing your question. Please try again later.",
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Loading meeting details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-4" />
          <p className="text-red-600 dark:text-red-400 mb-4">
            Error loading meeting: {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!transcriptionData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">
          No meeting data available
        </p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                {transcriptionData.type === "youtube" ? (
                  <Youtube className="w-6 h-6 text-red-500" />
                ) : (
                  <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {transcriptionData.title}
                </h1>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>{formatDate(transcriptionData.createdAt)}</span>
                  <span>
                    Duration: {formatDuration(transcriptionData.duration)}
                  </span>
                  {transcriptionData.originalSource && (
                    <a
                      href={transcriptionData.originalSource}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                    >
                      Original Source
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={openModal}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <SquarePen className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={openDeleteModal}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {isUpdateModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full sm:w-96 md:w-2/3 lg:w-1/2 xl:w-1/3 max-h-[80vh] h-auto overflow-y-auto">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
                Update Transcription
              </h2>

              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
                placeholder="Update title"
              />

              <textarea
                value={updatedSummary}
                onChange={(e) => setUpdatedSummary(e.target.value)}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
                placeholder="Update summary"
                rows={rows}
              />

              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}

        {isDeleteModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50 backdrop-blur-sm">
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
      Are you sure?
    </h2>
    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
      Do you really want to delete this transcription? This action cannot be undone.
    </p>

    <div className="flex justify-end space-x-4">
      <button
        onClick={closeDeleteModal}
        className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
      >
        Cancel
      </button>
      <button
        onClick={handleDelete}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  </div>
</div>

        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Summary
              </h2>
              <div className="max-h-96 overflow-y-auto pr-2 mb-6">
                <div className="prose dark:prose-invert max-w-none">
                  <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    <ReactMarkdown
                      children={
                        transcriptionData.summary || "No summary available."
                      }
                      remarkPlugins={[remarkGfm]}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Ask about the meeting
              </h2>

              <div className="h-64 overflow-y-auto mb-4 space-y-4 p-2">
                {chatMessages.length === 0 && !chatLoading && (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                    <Bot className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">
                      Ask me anything about this meeting!
                    </p>
                    <p className="text-xs mt-1">
                      Try: "What were the main decisions?" or "Tell me about the
                      sales issues"
                    </p>
                  </div>
                )}

                {/* Display chat messages */}
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex items-start space-x-2 max-w-xs lg:max-w-sm ${
                        msg.type === "user"
                          ? "flex-row-reverse space-x-reverse"
                          : ""
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          msg.type === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        {msg.type === "user" ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Bot className="w-4 h-4" />
                        )}
                      </div>
                      <div
                        className={`rounded-lg px-3 py-2 ${
                          msg.type === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                        }`}
                      >
                        <p className="text-sm">{String(msg.content)}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.type === "user"
                              ? "text-blue-100"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          {msg.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  placeholder="Ask about the meeting..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage(e);
                    }
                  }}
                  disabled={isTyping}
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!message.trim() || isTyping}
                  className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Transcription
              </h3>
              <div className="overflow-y-auto max-h-72">
                <div className="space-y-4">
                  {recentTranscriptions.map((item) => (
                    <Link to={`/dashboard/meeting/${item._id}`} key={item._id}>
                      {" "}
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors my-4">
                        <div className="flex items-center space-x-4 my-2">
                          <div
                            className={`p-2 rounded-lg ${
                              item.type === "youtube"
                                ? "bg-red-100 dark:bg-red-900/20"
                                : item.type === "upload"
                                ? "bg-purple-100 dark:bg-purple-900/20"
                                : "bg-blue-100 dark:bg-blue-900/20"
                            }`}
                          >
                            {item.type === "youtube" ? (
                              <Youtube className="h-5 w-5 text-red-600 dark:text-red-400" />
                            ) : item.type === "upload" ? (
                              <File className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            ) : (
                              <Mic className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            )}
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Duration: {item.duration}s • Accuracy:{" "}
                              {item.accuracy}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            <Download className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            <Share2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {quizData.length === 0 && quizResult === null && (
                <div className="my-4">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleGenerateQuiz();
                    }}
                    disabled={quizLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {quizLoading ? "Generating..." : "Generate Quiz"}
                  </button>
                </div>
              )}
              {quizResult && (
                <div className="grid grid-cols-1 gap-4 mt-4">
                  {/* Correct */}
                  <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Answers Correct
                        </p>
                        <p className="text-lg font-bold text-green-600 dark:text-green-400">
                          {quizResult.correctCount}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Wrong */}
                  <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl  p-4">
                    <div className="flex items-center space-x-3">
                      <XCircle className="w-6 h-6 text-red-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Answers Wrong
                        </p>
                        <p className="text-lg font-bold text-red-600 dark:text-red-400">
                          {quizResult.wrongCount}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Comprehension */}
                  <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-6 h-6 text-yellow-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Comprehension
                        </p>
                        <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                          {Math.round(quizResult.percentage * 100)}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quiz Card */}
            {quizData.length > 0 && (
              <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Quiz
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {currentQuestionIndex + 1}/{quizData.length}
                  </span>
                </div>

                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  {quizData[currentQuestionIndex].mcq}
                </p>

                <div className="space-y-3 mb-6">
                  {Array.isArray(quizData[currentQuestionIndex]?.options) &&
                    quizData[currentQuestionIndex].options.map(
                      (option: { key: string; value: string }, idx: number) => (
                        <label
                          key={idx}
                          className="flex items-center space-x-3 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name={`quiz-${currentQuestionIndex}`}
                            value={option.key}
                            checked={
                              userAnswers[currentQuestionIndex] === option.key
                            }
                            onChange={() => {
                              const updatedAnswers = [...userAnswers];
                              updatedAnswers[currentQuestionIndex] = option.key;
                              setUserAnswers(updatedAnswers);
                            }}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                          />
                          <div className="flex items-center space-x-2">
                            <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-semibold">
                              {option.key.toUpperCase()}
                            </span>
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {option.value}
                            </span>
                          </div>
                        </label>
                      )
                    )}
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() =>
                      setCurrentQuestionIndex((i) => Math.max(0, i - 1))
                    }
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {currentQuestionIndex === quizData.length - 1 ? (
                    <button
                      onClick={handleSubmitQuiz}
                      className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        setCurrentQuestionIndex((i) =>
                          Math.min(i + 1, quizData.length - 1)
                        )
                      }
                      className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingDetailPage;
