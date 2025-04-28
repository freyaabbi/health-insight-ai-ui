
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-8 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold text-health-text">HealthInsight AI</h3>
            <p className="text-sm text-gray-500">AI-powered health diagnosis with 98% accuracy</p>
          </div>
          
          <div className="text-sm text-center md:text-right text-gray-500">
            <p>© {new Date().getFullYear()} HealthInsight AI. All rights reserved.</p>
            <p className="mt-1">This system is for informational purposes only and is not a substitute for professional medical advice.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
