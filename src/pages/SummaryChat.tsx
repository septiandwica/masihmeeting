import React, { useState } from "react";
import { MeetingHeader } from "../summarychatbotcomponents/MeetingHeader";
import { UnifiedSummaryChat } from "../summarychatbotcomponents/UnifiedSummaryChat";
import { RecentFiles } from "../summarychatbotcomponents/RecentFiles";
import { QuizSection } from "../summarychatbotcomponents/QuizSection";
import { Lock, Home, Navigation, CheckCircle, Clock } from "lucide-react";

// Sample data
const meetingSummaryData = [
  {
    id: "lock-screen",
    title: "Lock Screen Improvements",
    icon: <Lock size={16} className="text-blue-600" />,
    decisions: [
      "Improve lock screen editor for better customization.",
      "Introduce new clock options and depth effect for clocks.",
      "Allow manual resizing of the clock and option to remove the clock.",
      "Consider adding always-visible widgets on the lock screen.",
    ],
    actionItems: [
      "Google to enhance lock screen customization options.",
      "Develop new clock designs and depth effects.",
      "Implement manual resizing feature for clocks.",
      "Explore adding always-visible widgets to lock screen.",
    ],
  },
  {
    id: "home-screen",
    title: "Home Screen Enhancements",
    icon: <Home size={16} className="text-green-600" />,
    decisions: [
      "Allow removal of At-a-Glance and search bar widgets.",
      "Enable support for third-party icon packs and more grid sizing options.",
      "Improve app moving process and add option to turn off app labels.",
      "Consider adding double tap to lock screen feature and enhancing animations.",
    ],
    actionItems: [
      "Provide option to remove specific home screen widgets.",
      "Support third-party icon packs and additional grid size options.",
      "Enhance app moving functionality and allow disabling of app labels.",
      "Explore implementing double tap to lock screen and animation improvements.",
    ],
  },
  {
    id: "navigation",
    title: "Gestural Navigation & Third-Party Launchers",
    icon: <Navigation size={16} className="text-purple-600" />,
    decisions: [
      "Google to improve fluidity of third-party launchers with gestural navigation.",
      "Consider adding functionality to enhance performance of alternative launchers.",
    ],
    actionItems: [
      "Optimize gestural navigation compatibility with third-party launchers.",
      "Develop enhanced performance features for alternative launcher apps.",
    ],
  },
];

const recentFilesData = [
  {
    id: "1",
    name: "Client Call - ProjectX.mp3",
    duration: "45:20",
    type: "audio" as const,
  },
  {
    id: "2",
    name: "UTSBrief - ProjectA.mp3",
    duration: "18:22",
    type: "audio" as const,
  },
  {
    id: "3",
    name: "Product Demo - YouTube",
    duration: "32:45",
    type: "video" as const,
  },
  {
    id: "4",
    name: "Board Meeting Q1 Review",
    duration: "1:20:15",
    type: "audio" as const,
  },
  {
    id: "5",
    name: "Seminar Recording",
    duration: "31:33",
    type: "video" as const,
  },
];

const quizData = [
  {
    id: "q1",
    question:
      "What feature is being considered for always-visible display on the lock screen?",
    options: [
      { id: "a", text: "Battery indicator" },
      { id: "b", text: "Widget" },
      { id: "c", text: "Notification List" },
      { id: "d", text: "Weather Animations" },
    ],
    correctAnswer: "b",
  },
  {
    id: "q2",
    question:
      "Which home screen customization feature was discussed for removal?",
    options: [
      { id: "a", text: "App icons" },
      { id: "b", text: "Wallpaper options" },
      { id: "c", text: "At-a-Glance widget" },
      { id: "d", text: "App drawer" },
    ],
    correctAnswer: "c",
  },
  {
    id: "q3",
    question: "What improvement is planned for third-party launchers?",
    options: [
      { id: "a", text: "Better gestural navigation fluidity" },
      { id: "b", text: "Enhanced security features" },
      { id: "c", text: "Faster installation process" },
      { id: "d", text: "Improved battery optimization" },
    ],
    correctAnswer: "a",
  },
];

const SummaryChat: React.FC = () => {
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleQuizAnswer = (questionId: string, answerId: string) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuizQuestion < quizData.length - 1) {
      setCurrentQuizQuestion((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuizQuestion > 0) {
      setCurrentQuizQuestion((prev) => prev - 1);
    }
  };

  const handleSendMessage = (message: string) => {
    setIsAiLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      setIsAiLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <div className="border dark:shadow-white bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-8">
        <MeetingHeader
          title="Client Call - ProjectX.mp3"
          date="July 29, 2025"
          duration="45:20"
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Meeting Summary */}
          <div className="lg:col-span-2 space-y-8">
            <UnifiedSummaryChat
              sections={meetingSummaryData}
              onSendMessage={handleSendMessage}
              isLoading={isAiLoading}
            />
          </div>

          {/* Right Column - Files and Quiz */}
          <div className="space-y-8">
            <RecentFiles files={recentFilesData} />

            <QuizSection
              questions={quizData}
              currentQuestion={currentQuizQuestion}
              onAnswerSelect={handleQuizAnswer}
              onNextQuestion={handleNextQuestion}
              onPreviousQuestion={handlePreviousQuestion}
              userAnswers={quizAnswers}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryChat;
