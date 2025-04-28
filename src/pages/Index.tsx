
import React, { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import SymptomSelector from '@/components/SymptomSelector';
import DiagnosisResult from '@/components/DiagnosisResult';
import Footer from '@/components/Footer';
import { predictDisease } from '@/services/diagnosisService';
import { useToast } from '@/hooks/use-toast';

enum AppState {
  HOME,
  SYMPTOM_SELECTION,
  RESULT
}

const Index = () => {
  const [appState, setAppState] = useState<AppState>(AppState.HOME);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [diagnosis, setDiagnosis] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleStartDiagnosis = () => {
    setAppState(AppState.SYMPTOM_SELECTION);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSymptomSubmit = async (selectedSymptoms: string[]) => {
    if (selectedSymptoms.length === 0) {
      toast({
        title: "No symptoms selected",
        description: "Please select at least one symptom",
        variant: "destructive"
      });
      return;
    }

    setSymptoms(selectedSymptoms);
    setIsLoading(true);

    try {
      const result = await predictDisease(selectedSymptoms);
      setDiagnosis(result);
      setAppState(AppState.RESULT);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze symptoms. Please try again.",
        variant: "destructive"
      });
      console.error('Diagnosis error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAppState(AppState.SYMPTOM_SELECTION);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (appState) {
      case AppState.HOME:
        return <HeroSection onStartClick={handleStartDiagnosis} />;
      case AppState.SYMPTOM_SELECTION:
        return <SymptomSelector onSubmit={handleSymptomSubmit} isLoading={isLoading} />;
      case AppState.RESULT:
        return <DiagnosisResult diseaseName={diagnosis} symptoms={symptoms} onReset={handleReset} />;
      default:
        return <HeroSection onStartClick={handleStartDiagnosis} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header onStartDiagnosisClick={handleStartDiagnosis} />
      
      <main className="flex-grow py-8 px-4">
        {renderContent()}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
