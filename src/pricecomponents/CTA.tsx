import React from "react";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  const handleGetStarted = () => {
    console.log("Getting started...");
    // Handle CTA action
  };

  return (
    <section className="relative py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-y-6"></div>
      </div>

      <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Got long meetings? Let us handle it for you!
        </h2>
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join thousands of people already using MasiMeeting? to boost
          productivity and collaboration.
        </p>
        <button
          onClick={handleGetStarted}
          className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Let's begin!
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
