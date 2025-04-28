
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface DiseaseInfo {
  id: number;
  name: string;
  symptoms: string[];
  description: string;
  recommendations: string[];
}

interface DiagnosisResultProps {
  diseaseName: string;
  symptoms: string[];
  onReset: () => void;
}

// This is just mock data - in a real app, this would come from your backend
const getDiseaseInfo = (diseaseName: string, reportedSymptoms: string[]): DiseaseInfo => {
  const diseaseDescriptions: Record<string, { description: string, recommendations: string[] }> = {
    "Fungal infection": {
      description: "A fungal infection occurs when fungi multiply and overgrow in or on the body, often causing irritation, inflammation, or other symptoms.",
      recommendations: ["Keep the affected area clean and dry", "Use prescribed antifungal medications", "Avoid sharing personal items"]
    },
    "Allergy": {
      description: "An allergic reaction occurs when your immune system overreacts to substances that are generally harmless to most people.",
      recommendations: ["Identify and avoid allergens", "Take antihistamines as prescribed", "Seek emergency care for severe reactions"]
    },
    "GERD": {
      description: "Gastroesophageal reflux disease (GERD) is a chronic condition where stomach acid flows back into the esophagus, causing irritation.",
      recommendations: ["Avoid trigger foods", "Don't lie down after eating", "Elevate head when sleeping"]
    },
    "Chronic cholestasis": {
      description: "A condition characterized by decreased bile flow resulting in the accumulation of bile acids in the liver and bloodstream.",
      recommendations: ["Follow a low-fat diet", "Take prescribed medications", "Regular monitoring of liver function"]
    },
    "Drug Reaction": {
      description: "An adverse response to a medication that may range from mild to severe, including allergic reactions.",
      recommendations: ["Stop taking the suspected medication", "Seek immediate medical attention", "Inform all healthcare providers about the reaction"]
    },
    "Peptic ulcer disease": {
      description: "Open sores that develop on the inside lining of the stomach, upper small intestine, or esophagus.",
      recommendations: ["Take prescribed antibiotics and acid-suppressing medications", "Avoid NSAIDs", "Limit alcohol consumption"]
    },
    "AIDS": {
      description: "Acquired immunodeficiency syndrome (AIDS) is a chronic condition caused by the human immunodeficiency virus (HIV).",
      recommendations: ["Adhere to antiretroviral therapy", "Regular medical checkups", "Practice safe behaviors to prevent transmission"]
    },
    "Diabetes": {
      description: "A group of diseases that affect how your body uses blood sugar (glucose).",
      recommendations: ["Monitor blood sugar regularly", "Follow a balanced diet", "Take prescribed medications or insulin as directed"]
    },
    "Gastroenteritis": {
      description: "An inflammation of the lining of the intestines caused by a virus, bacteria, or parasites.",
      recommendations: ["Stay hydrated", "Rest and avoid solid foods initially", "Gradually reintroduce mild foods"]
    },
    "Bronchial Asthma": {
      description: "A condition in which your airways narrow and swell and may produce extra mucus, making breathing difficult.",
      recommendations: ["Use prescribed inhalers correctly", "Identify and avoid triggers", "Follow your asthma action plan"]
    },
    "Hypertension": {
      description: "A common condition where the long-term force of blood against artery walls is high enough to cause health problems.",
      recommendations: ["Regular blood pressure monitoring", "Follow a low-sodium diet", "Take prescribed medications consistently"]
    },
    "Migraine": {
      description: "A headache disorder characterized by recurrent headaches that are moderate to severe.",
      recommendations: ["Identify and avoid triggers", "Take medications at first sign of a migraine", "Establish regular sleep patterns"]
    },
    "Cervical spondylosis": {
      description: "Age-related wear and tear affecting the spinal disks in your neck, causing pain and stiffness.",
      recommendations: ["Physical therapy exercises", "Use proper posture", "Apply heat or cold to the affected area"]
    },
    "Paralysis (brain hemorrhage)": {
      description: "Loss of muscle function caused by bleeding in the brain that damages the nervous system.",
      recommendations: ["Follow rehabilitation therapy", "Make home modifications for safety", "Prevent complications with proper positioning"]
    },
    "Jaundice": {
      description: "A condition in which the skin, whites of the eyes, and mucous membranes turn yellow due to a high level of bilirubin.",
      recommendations: ["Identify and treat the underlying cause", "Rest and stay hydrated", "Follow a special diet if recommended"]
    },
    "Malaria": {
      description: "A mosquito-borne disease caused by a parasite that leads to fever, chills, and flu-like illness.",
      recommendations: ["Complete the full course of prescribed antimalarial drugs", "Rest and stay hydrated", "Use mosquito prevention measures"]
    },
    "Chicken pox": {
      description: "A highly contagious viral infection causing an itchy, blister-like rash on the skin.",
      recommendations: ["Avoid scratching the blisters", "Use calamine lotion or other anti-itch medications", "Stay isolated until all blisters have crusted over"]
    },
    "Dengue": {
      description: "A mosquito-borne viral disease that causes fever, headaches, and pain in muscles and joints.",
      recommendations: ["Rest and stay hydrated", "Take acetaminophen for fever and pain", "Avoid aspirin and NSAIDs"]
    },
    "Typhoid": {
      description: "A bacterial infection that can spread throughout the body, affecting many organs.",
      recommendations: ["Complete the full course of antibiotics", "Rest and stay hydrated", "Practice strict hand hygiene"]
    },
    "Hepatitis A": {
      description: "A highly contagious liver infection caused by the hepatitis A virus.",
      recommendations: ["Rest and maintain adequate nutrition", "Avoid alcohol", "Follow up with your healthcare provider regularly"]
    },
    "Hepatitis B": {
      description: "A serious liver infection caused by the hepatitis B virus that can be chronic.",
      recommendations: ["Follow your medical treatment plan", "Avoid alcohol", "Get regular liver function tests"]
    },
    "Hepatitis C": {
      description: "An infection caused by a virus that attacks the liver and leads to inflammation.",
      recommendations: ["Complete the full course of antiviral medications", "Avoid alcohol", "Get vaccinated against hepatitis A and B"]
    },
    "Hepatitis D": {
      description: "A serious liver disease caused by the hepatitis D virus, which requires hepatitis B virus to replicate.",
      recommendations: ["Take prescribed medications", "Avoid alcohol", "Get regular liver function tests"]
    },
    "Hepatitis E": {
      description: "A liver disease caused by the hepatitis E virus, commonly spread through contaminated water.",
      recommendations: ["Rest and maintain adequate hydration", "Follow dietary recommendations", "Avoid alcohol"]
    }
  };

  const fallback = {
    description: "A medical condition that affects the body and may require professional medical attention.",
    recommendations: ["Consult with a healthcare professional for proper diagnosis and treatment", "Follow prescribed treatment plans", "Monitor your symptoms"]
  };

  const info = diseaseDescriptions[diseaseName] || fallback;
  
  return {
    id: 0, // placeholder
    name: diseaseName,
    symptoms: reportedSymptoms,
    description: info.description,
    recommendations: info.recommendations
  };
};

const DiagnosisResult: React.FC<DiagnosisResultProps> = ({ diseaseName, symptoms, onReset }) => {
  const diseaseInfo = getDiseaseInfo(diseaseName, symptoms);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="border-2 border-health-primary shadow-lg">
        <CardHeader className="bg-health-secondary">
          <CardTitle className="text-2xl font-bold text-health-text">Diagnosis Result</CardTitle>
          <CardDescription>Based on the symptoms you provided</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-health-text mb-2">Likely Condition:</h3>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-health-primary">{diseaseInfo.name}</span>
              <span className="ml-2 bg-health-primary text-white text-xs px-2 py-1 rounded-full">98% Accuracy</span>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-md font-semibold text-health-text mb-2">Symptoms Reported:</h3>
            <div className="flex flex-wrap gap-2">
              {diseaseInfo.symptoms.map((symptom, index) => (
                <Badge key={index} variant="secondary" className="bg-health-secondary text-health-text">
                  {symptom}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-md font-semibold text-health-text mb-2">About this condition:</h3>
            <p className="text-gray-700">{diseaseInfo.description}</p>
          </div>
          
          <div className="mb-4">
            <h3 className="text-md font-semibold text-health-text mb-2">Recommendations:</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {diseaseInfo.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
          
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 text-amber-700 mt-6">
            <p className="font-semibold">Important Note:</p>
            <p className="text-sm">This is an AI-generated diagnosis and should not replace professional medical advice. Please consult a healthcare professional for proper evaluation.</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button 
            variant="outline" 
            onClick={onReset}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to symptoms
          </Button>
          <Button className="bg-health-primary hover:bg-health-accent">
            Save Report
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DiagnosisResult;
