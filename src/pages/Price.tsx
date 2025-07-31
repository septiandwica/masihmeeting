import React, { useState } from "react";
import Hero from "../pricecomponents/Hero";
import Pricing from "../pricecomponents/Pricing";
import CTA from "../pricecomponents/CTA";

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Hero />
      <Pricing />
      <CTA />
    </div>
  );
}

export default App;
