
import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onStartDiagnosisClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onStartDiagnosisClick }) => {
  return (
    <header className="w-full bg-white shadow-sm py-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="flex items-center mb-4 md:mb-0">
          <Heart className="h-8 w-8 text-health-primary mr-2" />
          <h1 className="text-2xl font-bold text-health-text">HealthInsight AI</h1>
        </div>
        <div className="flex space-x-4">
          <Button 
            onClick={onStartDiagnosisClick} 
            variant="default" 
            className="bg-health-primary hover:bg-health-accent text-white"
          >
            Start Diagnosis
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
