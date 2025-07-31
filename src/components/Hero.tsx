import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-[url('/images/teams.png')] bg-cover bg-center bg-no-repeat opacity-14"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100/10 to-gray-100/98 dark:from-gray-900/10 dark:to-gray-800/98"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40">
        
      </div>
    </section>
  );
};

export default Hero;