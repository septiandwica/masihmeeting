import React from 'react';

interface CardProps {
  bgColor: string;     
  iconBgColor: string;   
  icon: React.ReactNode;  
  title: string;         
  description: string;   
}

const Card: React.FC<CardProps> = ({ bgColor, iconBgColor, icon, title, description }) => {
  return (
    <div className={`${bgColor} rounded-xl p-8 text-center hover:scale-105 transition-transform duration-300`}>
      <div className={`${iconBgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

export default Card;
