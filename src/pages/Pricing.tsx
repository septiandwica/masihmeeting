import React from 'react';
import PricingCard from '../components/PricingCard';
import Hero from '../components/Hero';
import { useNavigate } from 'react-router-dom';

const PricingPage: React.FC = () => {
    const navigate = useNavigate();
  const handleGetStarted = () => {
    console.log('Get Started clicked');
    navigate('/register'); 
  };

  const handleStartTrial = () => {
    console.log('Start Trial clicked');
    navigate('/register');
  };

  const handleContactSales = () => {
    console.log('Contact Sales clicked');
    navigate('/register');
  };

  return (
   <>
   <Hero />
    <section className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            SELECT THE BEST PLAN
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            FOR YOUR NEEDS
          </h3>
          <p className="text-xl text-blue-600 dark:text-blue-400 max-w-4xl mx-auto">
            Our platform combines advanced AI with enterprise-grade security to deliver the most
            accurate and reliable speech-to-text solution for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PricingCard
            title="Starter"
            price="FREE"
            description='For those getting started with "MasihMeeting?"'
            features={[
              "30 minutes of transcription per month",
              "Basic speech-to-text accuracy",
              "Standard support",
              "Basic meeting summaries",
              "Export to text format"
            ]}
            buttonText="Get Started Free"
            buttonVariant="outline"
            onButtonClick={handleGetStarted}
          />

          <PricingCard
            title="Pro"
            price="$19.99"
            priceUnit="/Month"
            description='Better experience with "MasihMeeting?"'
            features={[
              "500 minutes of transcription per month",
              "Advanced AI speech-to-text",
              "Priority support",
              "Advanced meeting analytics",
              "Export to multiple formats",
              "Speaker identification",
              "Real-time transcription"
            ]}
            buttonText="Start Pro Trial"
            buttonVariant="primary"
            isPopular={true}
            onButtonClick={handleStartTrial}
          />

          <PricingCard
            title="Business"
            price="$49.99"
            priceUnit="/Month"
            description='For best experience with "MasihMeeting?"'
            features={[
              "Unlimited transcription",
              "Enterprise-grade security",
              "Dedicated support",
              "Custom vocabulary training",
              "and All Features from Pro Plans"
            ]}
            buttonText="Contact Sales"
            buttonVariant="secondary"
            onButtonClick={handleContactSales}
          />
        </div>
      </div>
    </section>
   </>
  );
};

export default PricingPage;