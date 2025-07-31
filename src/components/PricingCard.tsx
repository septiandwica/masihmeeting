import React from 'react';
import { Zap } from 'lucide-react';

interface PricingCardProps {
  title: string;
  price: string;
  priceUnit?: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant?: 'primary' | 'secondary' | 'outline';
  isPopular?: boolean;
  onButtonClick?: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  priceUnit = '',
  description,
  features,
  buttonText,
  buttonVariant = 'primary',
  isPopular = false,
  onButtonClick
}) => {
  const getButtonStyles = () => {
    switch (buttonVariant) {
      case 'primary':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'secondary':
        return 'bg-blue-500 hover:bg-blue-600 text-white';
      case 'outline':
        return 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20';
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white';
    }
  };

  return (
    <div className={`relative rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl ${
      isPopular 
        ? 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 border-2 border-blue-500 scale-105' 
        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
    }`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center mb-8">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
          isPopular ? 'bg-blue-500' : 'bg-blue-500'
        }`}>
          <Zap className="h-8 w-8 text-white" />
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        
        <div className="mb-4">
          <span className="text-4xl font-bold text-gray-900 dark:text-white">
            {price}
          </span>
          {priceUnit && (
            <span className="text-gray-600 dark:text-gray-400 ml-1">
              {priceUnit}
            </span>
          )}
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {description}
        </p>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg
              className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-gray-700 dark:text-gray-300 text-sm">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={onButtonClick}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${getButtonStyles()}`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default PricingCard;