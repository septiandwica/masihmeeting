import React from "react";
import { Zap, Users } from "lucide-react";
import Card from "../components/FeaturedCard";
import Hero from "../components/Hero";

const FeaturesPage: React.FC = () => {
  return (
    <>
    <Hero />
 <div className="h-screen bg-white dark:bg-gray-900 transition-colors duration-300 flex items-center justify-center">
      <section className="py-24 bg-white dark:bg-gray-900 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose MasihMeeting??
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform combines advanced AI with enterprise-grade security
              to deliver the most accurate and reliable speech-to-text solution
              for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card
              bgColor="bg-purple-50 dark:bg-blue-900/20"
              iconBgColor="bg-blue-500"
              icon={<Zap className="h-8 w-8 text-white" />}
              title="Understanding Your Meeting"
              description="Get instant transcriptions with 99.9% accuracy. Perfect for live meetings, conferences, and customer calls."
            />

            <Card
              bgColor="bg-green-50 dark:bg-green-900/20"
              iconBgColor="bg-green-500"
              icon={<Zap className="h-8 w-8 text-white" />}
              title="Up-To-Date in a Flash"
              description="Long meetings? No problem. MasihMeeting condenses hours of content into concise, easy-to-read summaries—saving you time without missing key points."
            />

            <Card
              bgColor="bg-purple-50 dark:bg-purple-900/20"
              iconBgColor="bg-purple-500"
              icon={<Users className="h-8 w-8 text-white" />}
              title="Test Your Understanding"
              description="Don’t just read—retain. MasihMeeting automatically generates quizzes to help you reinforce and test your understanding."
            />

            <Card
              bgColor="bg-yellow-50 dark:bg-yellow-900/20"
              iconBgColor="bg-yellow-500"
              icon={<Zap className="h-8 w-8 text-white" />}
              title="Seamless Integration"
              description="Integrate MasihMeeting with your preferred platforms and tools. Experience seamless collaboration and productivity."
            />
          </div>
        </div>
      </section>
    </div>
    </>
   
  );
};

export default FeaturesPage;
