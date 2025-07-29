import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  CheckCircle,
  Clock,
  Lock,
  Home,
  Navigation,
} from "lucide-react";

interface Message {
  id: string;
  type: "user" | "ai" | "summary";
  content: string;
  timestamp: Date;
  relatedSection?: string;
  summaryData?: SummarySection;
}

interface SummarySection {
  id: string;
  title: string;
  icon: React.ReactNode;
  decisions: string[];
  actionItems: string[];
}

interface UnifiedSummaryChatProps {
  sections: SummarySection[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

export const UnifiedSummaryChat: React.FC<UnifiedSummaryChatProps> = ({
  sections,
  onSendMessage,
  isLoading = false,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Initialize with summary sections as messages
  useEffect(() => {
    const summaryMessages: Message[] = sections.map((section, index) => ({
      id: `summary-${section.id}`,
      type: "summary" as const,
      content: "",
      timestamp: new Date(Date.now() - (sections.length - index) * 1000),
      summaryData: section,
    }));
    setMessages(summaryMessages);
  }, [sections]);

  // Scroll to bottom of chat messages when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Scroll page to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        type: "user",
        content: inputValue,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");

      // Simulate AI response
      setTimeout(() => {
        let aiResponse = "";
        let relatedSection = "";

        if (inputValue.toLowerCase().includes("lock screen")) {
          aiResponse =
            "Based on the meeting, several lock screen improvements are planned including enhanced customization options, new clock designs with depth effects, manual clock resizing, and the possibility of always-visible widgets.";
          relatedSection = "Lock Screen Improvements";
        } else if (inputValue.toLowerCase().includes("home screen")) {
          aiResponse =
            "The meeting covered home screen enhancements including the option to remove At-a-Glance and search bar widgets, support for third-party icon packs, improved app moving functionality, and potential double-tap to lock feature.";
          relatedSection = "Home Screen Enhancements";
        } else if (
          inputValue.toLowerCase().includes("action") ||
          inputValue.toLowerCase().includes("next steps")
        ) {
          aiResponse =
            "Key action items include: enhancing lock screen customization, developing new clock designs, supporting third-party icon packs, improving app moving processes, and optimizing gestural navigation for third-party launchers.";
        } else if (inputValue.toLowerCase().includes("decision")) {
          aiResponse =
            "Major decisions made include improving lock screen editors, introducing clock depth effects, allowing widget removal from home screen, and enhancing third-party launcher compatibility with gestural navigation.";
        } else {
          aiResponse =
            "I can help you understand any aspect of this meeting. Feel free to ask about specific topics like lock screen improvements, home screen enhancements, gestural navigation, or any decisions and action items discussed.";
        }

        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          type: "ai",
          content: aiResponse,
          timestamp: new Date(),
          relatedSection,
        };

        setMessages((prev) => [...prev, aiMessage]);
      }, 1000 + Math.random() * 1000);

      onSendMessage(inputValue);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const renderSummarySection = (section: SummarySection) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
          {section.icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
      </div>

      {section.decisions.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Decisions:</h4>
          <ul className="space-y-2">
            {section.decisions.map((decision, index) => (
              <li
                key={index}
                className="text-sm text-gray-600 flex items-start"
              >
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                {decision}
              </li>
            ))}
          </ul>
        </div>
      )}

      {section.actionItems.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Action Items:
          </h4>
          <ul className="space-y-2">
            {section.actionItems.map((item, index) => (
              <li
                key={index}
                className="text-sm text-gray-600 flex items-start"
              >
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Summary</h2>
      </div>

      <div className="p-6 max-h-[750px] overflow-y-auto" ref={chatContainerRef}>
        <div className="space-y-4">
          {messages.map((message) => {
            if (message.type === "summary" && message.summaryData) {
              return (
                <div key={message.id}>
                  {renderSummarySection(message.summaryData)}
                </div>
              );
            }

            if (message.type === "user" || message.type === "ai") {
              return (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  } mb-4`}
                >
                  <div
                    className={`flex items-start space-x-3 max-w-[80%] ${
                      message.type === "user"
                        ? "flex-row-reverse space-x-reverse"
                        : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === "user" ? "bg-blue-500" : "bg-gray-200"
                      }`}
                    >
                      {message.type === "user" ? (
                        <User size={16} className="text-white" />
                      ) : (
                        <Bot size={16} className="text-gray-600" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg p-3 ${
                        message.type === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      {message.relatedSection && (
                        <p className="text-xs mt-1 opacity-75">
                          Related to: {message.relatedSection}
                        </p>
                      )}
                      <p
                        className={`text-xs mt-1 ${
                          message.type === "user"
                            ? "text-blue-100"
                            : "text-gray-500"
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                  <div ref={messagesEndRef} /> {/* 👈 Add this */}
                </div>
              );
            }

            return null;
          })}

          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="flex items-start space-x-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <Bot size={16} className="text-gray-600" />
                </div>
                <div className="bg-gray-100 text-gray-800 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about the meeting..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};
