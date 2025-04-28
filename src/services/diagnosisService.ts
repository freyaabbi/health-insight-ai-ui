
// This is a simple mock service that simulates making a diagnosis based on symptoms
// In a production environment, this would call your actual SVM model API

const diseases = {
  "fever, cough, sore throat, runny nose": "Common Cold",
  "fever, cough, shortness of breath, fatigue": "COVID-19",
  "fever, diarrhea, coughing, cold": "Chicken pox",
  "headache, nausea, sensitivity to light, vomiting": "Migraine",
  "fever, headache, joint pain, rash": "Dengue",
  "abdominal pain, nausea, fever, diarrhea": "Gastroenteritis",
  "fever, chills, sweating, headache": "Malaria",
  "rash, itching, redness, swelling": "Allergy",
  "shortness of breath, wheezing, chest tightness, cough": "Bronchial Asthma",
  "cough, chest pain, fever, fatigue": "Pneumonia",
  "fever, headache, stiff neck, sensitivity to light": "Meningitis",
  "fatigue, increased thirst, frequent urination, hunger": "Diabetes",
  "fatigue, weakness, pale skin, shortness of breath": "Anemia",
  "joint pain, joint stiffness, swelling, reduced range of motion": "Arthritis",
  "heartburn, regurgitation, chest pain, difficulty swallowing": "GERD",
  "high fever, headache, abdominal pain, diarrhea": "Typhoid",
  "yellowish skin, dark urine, fatigue, abdominal pain": "Jaundice",
  "abdominal pain, bloating, constipation, diarrhea": "Irritable Bowel Syndrome",
  "itching, rash, redness, scaling": "Fungal infection",
};

// Mapping from disease ID to disease name based on your model's output
const label_to_disease = {
  0: "Fungal infection",
  1: "Allergy",
  2: "GERD",
  3: "Chronic cholestasis",
  4: "Drug Reaction",
  5: "Peptic ulcer disease",
  6: "AIDS",
  7: "Diabetes",
  8: "Gastroenteritis",
  9: "Bronchial Asthma",
  10: "Hypertension",
  11: "Migraine",
  12: "Cervical spondylosis",
  13: "Paralysis (brain hemorrhage)",
  14: "Jaundice",
  15: "Malaria",
  16: "Chicken pox",
  17: "Dengue",
  18: "Typhoid",
  19: "Hepatitis A",
  20: "Hepatitis B",
  21: "Hepatitis C",
  22: "Hepatitis D",
  23: "Hepatitis E"
};

// Mock disease prediction function
export const predictDisease = (symptoms: string[]): Promise<string> => {
  return new Promise((resolve) => {
    // In a real app, we would send the symptoms to your SVM model's API
    // Here we'll just simulate a response
    
    // Simple mock logic - in reality this would be handled by your ML model
    const symptomString = symptoms.join(', ').toLowerCase();
    
    // Add a delay to simulate API call
    setTimeout(() => {
      // Check exact matches first in our mock database
      for (const [key, value] of Object.entries(diseases)) {
        const keySymptoms = key.split(', ').map(s => s.toLowerCase());
        // If most symptoms match, return the disease
        if (symptoms.length >= 3 && keySymptoms.filter(s => symptoms.includes(s)).length >= 2) {
          resolve(value);
          return;
        }
      }
      
      // If no exact match, select a disease based on some common symptoms
      if (symptoms.includes('fever')) {
        if (symptoms.includes('cough')) {
          if (symptoms.includes('rash')) {
            resolve(label_to_disease[16]); // Chicken pox
          } else {
            resolve(label_to_disease[15]); // Malaria
          }
        } else if (symptoms.includes('headache')) {
          resolve(label_to_disease[17]); // Dengue
        } else if (symptoms.includes('abdominal pain') || symptoms.includes('diarrhea')) {
          resolve(label_to_disease[8]); // Gastroenteritis
        } else {
          resolve(label_to_disease[18]); // Typhoid
        }
      } else if (symptoms.includes('rash') || symptoms.includes('itching')) {
        resolve(label_to_disease[0]); // Fungal infection
      } else if (symptoms.includes('shortness of breath') || symptoms.includes('wheezing')) {
        resolve(label_to_disease[9]); // Bronchial Asthma
      } else {
        // Fall back to a random disease as a last resort
        const diseaseIds = Object.keys(label_to_disease);
        const randomId = diseaseIds[Math.floor(Math.random() * diseaseIds.length)];
        resolve(label_to_disease[Number(randomId)]);
      }
    }, 1500);
  });
};
