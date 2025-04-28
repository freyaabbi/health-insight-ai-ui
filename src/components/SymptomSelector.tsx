
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface SymptomSelectorProps {
  onSubmit: (symptoms: string[]) => void;
  isLoading: boolean;
}

const commonSymptoms = [
  "fever", "cough", "headache", "fatigue", "nausea", 
  "vomiting", "diarrhea", "rash", "shortness of breath", 
  "sore throat", "muscle pain", "cold", "chills", "weight loss",
  "joint pain", "dizziness", "chest pain", "abdominal pain"
];

const SymptomSelector: React.FC<SymptomSelectorProps> = ({ onSubmit, isLoading }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddSymptom = () => {
    if (inputValue.trim() && !selectedSymptoms.includes(inputValue.toLowerCase().trim())) {
      setSelectedSymptoms([...selectedSymptoms, inputValue.toLowerCase().trim()]);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSymptom();
    }
  };

  const handleRemoveSymptom = (symptom: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
  };

  const handleSelectCommonSymptom = (symptom: string) => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleSubmit = () => {
    if (selectedSymptoms.length > 0) {
      onSubmit(selectedSymptoms);
    }
  };

  const filteredCommonSymptoms = commonSymptoms.filter(
    symptom => !selectedSymptoms.includes(symptom)
  ).slice(0, 8);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-health-text">Select Your Symptoms</h2>
      
      <div className="mb-6">
        <div className="flex gap-2 mb-2">
          <Input 
            placeholder="Type your symptom here..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-grow"
          />
          <Button 
            onClick={handleAddSymptom}
            variant="outline"
          >
            Add
          </Button>
        </div>
        
        <div className="text-sm text-gray-600 mb-2">
          {selectedSymptoms.length === 0 ? 'Select at least one symptom' : 'Selected symptoms:'}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedSymptoms.map((symptom) => (
            <Badge 
              key={symptom} 
              variant="secondary"
              className="bg-health-secondary text-health-text px-3 py-1 flex items-center gap-1"
            >
              {symptom}
              <button 
                onClick={() => handleRemoveSymptom(symptom)}
                className="ml-1 hover:text-health-warning"
              >
                <X size={14} />
              </button>
            </Badge>
          ))}
          {selectedSymptoms.length === 0 && (
            <span className="text-gray-400 italic">No symptoms selected</span>
          )}
        </div>
      </div>
      
      {filteredCommonSymptoms.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2 text-gray-600">Common symptoms:</h3>
          <div className="flex flex-wrap gap-2">
            {filteredCommonSymptoms.map((symptom) => (
              <button
                key={symptom}
                onClick={() => handleSelectCommonSymptom(symptom)}
                className="px-3 py-1 bg-gray-100 hover:bg-health-secondary rounded-full text-sm transition-colors"
              >
                {symptom}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <Button 
        onClick={handleSubmit}
        disabled={selectedSymptoms.length === 0 || isLoading}
        className="w-full bg-health-primary hover:bg-health-accent"
      >
        {isLoading ? 'Analyzing Symptoms...' : 'Get Diagnosis'}
      </Button>
    </div>
  );
};

export default SymptomSelector;
