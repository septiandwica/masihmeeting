import React from 'react';
import { ArrowRight,  } from 'lucide-react';
import { Link } from 'react-router-dom';


const CallToAction: React.FC = () => {

      return (
        <section className="relative py-24 bg-gradient-to-r from-blue-600 to-purple-600">
       <div className="absolute inset-0 bg-[url('/images/handwriting.png')] bg-cover bg-center bg-no-repeat opacity-[0.14]"></div>

        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-blue-600/95"></div>
  

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Got long meetings? Let us handle it for you!
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of people already using MasihMeeting? to boost
            productivity.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors group"
          >
            Let's Begin
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
      )
}
export default CallToAction;