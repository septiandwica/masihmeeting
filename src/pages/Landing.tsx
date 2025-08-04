import React from "react";
import { Link } from "react-router-dom";
import { Mic, Zap, Users, ArrowRight, Play } from "lucide-react";
import Card from "../components/FeaturedCard"; 
import CallToAction from "../components/CallToAction";

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-[url('/images/teams.png')] bg-cover bg-center bg-no-repeat opacity-14"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100/10 to-gray-100/98 dark:from-gray-900/10 dark:to-gray-800/98"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                  Turn every
                  <span className="text-blue-600 dark:text-blue-400">
                    {" "}
                    meeting{" "}
                  </span>
                  into{" "}
                  <span className="text-blue-600 dark:text-blue-400">
                    {" "}
                    meaning.{" "}
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                  MasihMeeting transforms long meetings into sharp insights,
                  summaries, and smart quizzes—so you learn more, in less time.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/login"
                    className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors group"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-semibold rounded-lg transition-colors">
                    <Play className="mr-2 h-5 w-5" />
                    Watch Demo
                  </button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative  dark:bg-gray-800 rounded-lg overflow-hidden w-full h-40 transition-colors duration-300">
                        <img
                          src="/images/teams.png"
                          alt=""
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-800 to-transparent"></div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mic className="h-6 w-6 text-blue-500 animate-pulse" />
                      <div className="h-2 bg-blue-200 dark:bg-blue-800 rounded-full flex-1">
                        <div className="h-2 bg-blue-500 rounded-full w-3/4 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <p className="text-gray-700 dark:text-gray-300 font-mono text-sm">
                        “Here is a structured summary of the key topics,
                        discussions, and observations from the meeting
                        transcript regarding......”
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-gray-900">
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
          </div>
        </div>
      </section>
      <CallToAction />
    </div>
  );
};

export default Landing;
