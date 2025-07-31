import React from "react";
import { Zap, Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  subtitle: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  onSelect: () => void;
}

export default function PricingCard({
  title,
  subtitle,
  price,
  period,
  description,
  features,
  isPopular = false,
  buttonText,
  onSelect,
}: PricingCardProps) {
  return (
    <div
      className={`border dark:shadow-white bg-white dark:bg-gray-700 text-white relative s rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        isPopular ? "ring-2 ring-blue-500 scale-105" : ""
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium dark:text-white">
            Most Popular
          </div>
        </div>
      )}

      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div
            className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
              isPopular ? "bg-blue-500" : "bg-blue-100"
            }`}
          >
            <Zap
              className={`h-6 w-6 ${
                isPopular ? "text-white" : "text-blue-600"
              }`}
            />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2 dark:text-white">
            {title}
          </h3>
          <p className="text-gray-600 font-medium dark:text-white">
            {subtitle}
          </p>
        </div>

        {/* Price */}
        <div className="text-center mb-6">
          <div className="flex items-baseline justify-center">
            <span className="text-4xl font-bold text-gray-900 dark:text-green-400">
              {price}
            </span>
            {period && (
              <span className="text-gray-500 ml-1 dark:text-white">
                /{period}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-center mb-8 dark:text-white">
          {description}
        </p>

        {/* Features */}
        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
              <span className="text-gray-700 dark:text-white">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Button */}
        <button
          onClick={onSelect}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
            isPopular
              ? "bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl"
              : "bg-gray-100 text-gray-900 hover:bg-blue-400 dark:text-white dark:bg-gray-600"
          }`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
