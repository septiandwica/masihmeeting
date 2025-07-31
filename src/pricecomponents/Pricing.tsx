import React from "react";
import PricingCard from "./PricingCard";

export default function Pricing() {
  const handlePlanSelect = (plan: string) => {
    console.log(`Selected plan: ${plan}`);
    // Handle plan selection logic here
  };

  const pricingPlans = [
    {
      title: "Starter",
      subtitle: "FREE",
      price: "$0",
      description: 'For those getting started with "MasiMeeting"',
      features: [
        "30 minutes of transcription per month",
        "Basic speech-to-text accuracy",
        "Standard support",
        "Basic meeting summaries",
        "Export to text format",
      ],
      buttonText: "Get Started Free",
    },
    {
      title: "Starter",
      subtitle: "PRO",
      price: "$19.99",
      period: "month",
      description: 'Better experience with "MasiMeeting"',
      features: [
        "500 minutes of transcription per month",
        "Advanced AI speech-to-text",
        "Priority support",
        "Advanced meeting analytics",
        "Export to multiple formats",
        "Speaker identification",
        "Real-time transcription",
      ],
      isPopular: true,
      buttonText: "Start Pro Trial",
    },
    {
      title: "Starter",
      subtitle: "BUSINESS",
      price: "$49.99",
      period: "month",
      description: 'For best experience with "MasiMeeting"',
      features: [
        "Unlimited transcription",
        "Enterprise-grade security",
        "Dedicated support",
        "Custom integrations",
        "Advanced analytics dashboard",
        "Team collaboration tools",
        "API access",
        "Custom vocabulary training",
      ],
      buttonText: "Contact Sales",
    },
  ];

  return (
    <section
      id="pricing"
      className="py-20 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            SELECT THE BEST PLAN
            <br />
            FOR YOUR NEEDS
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our platform combines advanced AI with enterprise-grade security to
            deliver the most accurate and reliable speech-to-text solution for
            your business.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.title}
              subtitle={plan.subtitle}
              price={plan.price}
              period={plan.period}
              description={plan.description}
              features={plan.features}
              isPopular={plan.isPopular}
              buttonText={plan.buttonText}
              onSelect={() => handlePlanSelect(plan.subtitle)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
