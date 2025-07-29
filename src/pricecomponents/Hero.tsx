import React from "react";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 transform rotate-12 scale-150"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="w-full h-64 bg-gradient-to-r from-blue-200 to-purple-200 rounded-2xl mb-8 opacity-60 flex items-center justify-center">
            <div className="text-gray-600 text-lg font-medium">
              Meeting Collaboration Visual
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
