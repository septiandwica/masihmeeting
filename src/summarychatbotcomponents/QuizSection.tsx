import React, { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

interface QuizQuestion {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
}

interface QuizSectionProps {
  questions: QuizQuestion[];
  currentQuestion: number;
  onAnswerSelect: (questionId: string, answerId: string) => void;
  onNextQuestion: () => void;
  onPreviousQuestion: () => void;
  userAnswers: Record<string, string>;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  questions,
  currentQuestion,
  onAnswerSelect,
  onNextQuestion,
  onPreviousQuestion,
  userAnswers,
}) => {
  const question = questions[currentQuestion];
  const selectedAnswer = userAnswers[question.id];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Quiz</h3>
        <span className="text-sm text-gray-500">
          {currentQuestion + 1}/{questions.length}
        </span>
      </div>

      <div className="mb-6">
        <p className="text-gray-800 mb-4">{question.question}</p>
        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => onAnswerSelect(question.id, option.id)}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                selectedAnswer === option.id
                  ? "border-blue-500 bg-blue-50 text-blue-900"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === option.id
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {selectedAnswer === option.id && (
                    <CheckCircle size={16} className="text-white" />
                  )}
                </span>
                <span className="font-medium">{option.id.toUpperCase()}.</span>
                <span>{option.text}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={onPreviousQuestion}
          disabled={currentQuestion === 0}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        <button
          onClick={onNextQuestion}
          disabled={currentQuestion === questions.length - 1}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
};
