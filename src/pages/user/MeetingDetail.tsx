import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Download,
  Share,
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
} from "lucide-react";

import {
  getTranscriptionDetails,
  getUserTranscriptions,
} from "../../services/transcribeApi";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useParams } from "react-router-dom";

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
  const { id } = useParams<{ id: string }>(); 
  const [selectedAnswer, setSelectedAnswer] = useState("");
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

  const meetingId = id || "";
  const token = user?.token || localStorage.getItem("token") || "";

  const quizOptions = [
    { id: "A", label: "Battery Indicator" },
    { id: "B", label: "Widget" },
    { id: "C", label: "Notification List" },
    { id: "D", label: "Weather Animations" },
  ];

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
    scrollToBottom();
  }, [chatMessages]);

  const generateAIResponse = (userMessage: string): string => {
    if (!transcriptionData) {
      return "I'm sorry, I don't have access to the meeting data at the moment. Please try again later.";
    }

    const lowerMessage = userMessage.toLowerCase();
    const summary = transcriptionData.summary.toLowerCase();
    const transcription = transcriptionData.transcription.toLowerCase();

    if (lowerMessage.includes("sales") || lowerMessage.includes("figures")) {
      return "Based on the meeting, the regional sales figures are down and the company is not meeting budget targets. This decline needs immediate attention, and the team discussed various approaches including cost-saving measures and market research to understand the root cause.";
    } else if (
      lowerMessage.includes("cost") ||
      lowerMessage.includes("redundancies")
    ) {
      return "Maya (Finance Director) suggested cost-saving measures including potential redundancies to meet budget. However, David opposed this, emphasizing the need for a strong workforce. The team agreed that cost-cutting needs consideration alongside sales improvement efforts.";
    } else if (
      lowerMessage.includes("customer") ||
      lowerMessage.includes("anna")
    ) {
      return "Anna (Customer Services Director) reported a decrease in regional customers and an increase in contract cancellations within 14 days. She suggested reviewing customer account procedures from first contact to after-sales care to improve the customer experience.";
    } else if (
      lowerMessage.includes("research") ||
      lowerMessage.includes("survey")
    ) {
      return "The team agreed to hire an external researcher to conduct a customer survey and get a neutral view of their market position. David was assigned to find a suitable market research company to work with on this project.";
    } else if (
      lowerMessage.includes("summary") ||
      lowerMessage.includes("main points")
    ) {
      return "Main points: 1) Regional sales are declining and budget targets aren't being met, 2) Cost-saving measures vs. workforce retention debate, 3) Customer cancellations are increasing, 4) Need for external market research to understand customer perspective, 5) Review of customer account procedures recommended.";
    } else if (
      lowerMessage.includes("participants") ||
      lowerMessage.includes("who")
    ) {
      return "Meeting participants: Marcus (Managing Director), Maya (Finance Director), David (Sales and Marketing Director), and Anna (Customer Services Director) from Courts Power Group, a UK-based energy company.";
    } else {
      return "I can help you understand this meeting about Courts Power Group's sales challenges. Feel free to ask about sales figures, cost-cutting discussions, customer issues, market research plans, or any specific participant's contributions.";
    }
  };

  const handleSendMessage = (e?: React.FormEvent | React.KeyboardEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (!message.trim() || isTyping) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: message.trim(),
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    const currentMessage = message.trim();
    setMessage("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: generateAIResponse(currentMessage),
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
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
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Download className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Summary
              </h2>
              <div className="max-h-96 overflow-y-auto pr-2 mb-6">
                <div className="prose dark:prose-invert max-w-none">
                  <div
                    className="text-gray-700 dark:text-gray-300 whitespace-pre-line"
                    dangerouslySetInnerHTML={{
                      __html:
                        transcriptionData.summary?.replace(/\n/g, "<br/>") ||
                        "No summary available.",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Ask about the meeting
              </h2>

              <div className="h-64 overflow-y-auto mb-4 space-y-4 p-2">
                {chatMessages.length === 0 && (
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
                        <p className="text-sm">{msg.content}</p>
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
              <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Answers Correct
                    </p>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">
                      12
                    </p>
                  </div>
                </div>
              </div>

              {/* Answers Wrong */}
              <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center space-x-3">
                  <XCircle className="w-6 h-6 text-red-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Answers Wrong
                    </p>
                    <p className="text-lg font-bold text-red-600 dark:text-red-400">
                      3
                    </p>
                  </div>
                </div>
              </div>

              {/* Comprehension */}
              <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center space-x-3">
                  <Clock className="w-6 h-6 text-yellow-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Comprehension
                    </p>
                    <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                      80%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quiz Card */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Quiz
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  2/5
                </span>
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                What was the main reason for declining sales according to the
                meeting?
              </p>

              <div className="space-y-3 mb-6">
                {[
                  { id: "A", label: "Poor product quality" },
                  { id: "B", label: "Better competitor offers" },
                  { id: "C", label: "Customer service issues" },
                  { id: "D", label: "Unknown - needs research" },
                ].map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="quiz"
                      value={option.id}
                      checked={selectedAnswer === option.id}
                      onChange={(e) => setSelectedAnswer(e.target.value)}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-semibold">
                        {option.id}
                      </span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {option.label}
                      </span>
                    </div>
                  </label>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium">
                  Submit
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingDetailPage;
