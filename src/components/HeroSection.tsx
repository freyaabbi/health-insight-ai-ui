
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onStartClick: () => void;
}

const HeroSection: React.FC<HeroProps> = ({ onStartClick }) => {
  return (
    <div className="container mx-auto px-4 py-16 text-center md:text-left md:flex md:items-center md:justify-between">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-health-text">
          AI-Powered Health Diagnosis
        </h1>
        <p className="text-xl mb-6 text-slate-600">
          Get accurate disease predictions based on your symptoms using our advanced AI system with a 98% accuracy rate.
        </p>
        <Button 
          onClick={onStartClick}
          className="bg-health-primary hover:bg-health-accent text-white px-6 py-3 text-lg"
        >
          Check Your Symptoms <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
      <div className="md:w-2/5">
        <div className="bg-health-secondary rounded-2xl p-6 shadow-lg">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="mb-4 flex items-center">
              <div className="w-3 h-3 bg-health-warning rounded-full mr-2"></div>
              <div className="text-sm font-medium text-slate-500">AI Diagnosis Assistant</div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-health-background rounded-lg p-3 ml-2 mr-auto max-w-[80%]">
                  <p className="text-sm">I have fever, cough and body pain...</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-health-primary text-white rounded-lg p-3 ml-auto mr-2 max-w-[80%]">
                  <p className="text-sm">Based on your symptoms, you might have Influenza. Please consult with a healthcare professional for confirmation.</p>
                </div>
              </div>
            </div>
            <div className="mt-4 animate-pulse-slow">
              <div className="h-4 bg-gray-100 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
