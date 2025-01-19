import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier, GradientBoostingRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.multioutput import MultiOutputRegressor
from sklearn.model_selection import cross_val_predict
from datetime import datetime, timedelta

class CareNeedsPredictor:
    def __init__(self):
        self.model = MultiOutputRegressor(GradientBoostingRegressor(
            n_estimators=200,
            learning_rate=0.1,
            max_depth=6,
            random_state=42
        ))
        self.scaler = StandardScaler()
        
    def preprocess_features(self, X):
        features = [
            'age', 'cancer_type', 'stage', 'days_since_diagnosis',
            'mobility_score', 'pain_level', 'consciousness_level',
            'appetite_score', 'medication_adherence', 'recent_symptoms',
            'caregiver_availability', 'has_medical_equipment'
        ]
        return self.scaler.transform(X[features])
        
    def train(self, X, y):
        X_processed = self.preprocess_features(X)
        # y contains multiple target variables for different care needs
        self.model.fit(X_processed, y)
        
    def predict_care_needs(self, patient_data):
        X_processed = self.preprocess_features(pd.DataFrame([patient_data]))
        predictions = self.model.predict(X_processed)[0]
        
        care_needs = {
            'daily_care_hours': round(predictions[0], 1),
            'pain_management_level': round(predictions[1]),
            'mobility_assistance_level': round(predictions[2]),
            'medication_supervision_need': round(predictions[3]),
            'nutrition_support_level': round(predictions[4]),
            'emotional_support_need': round(predictions[5])
        }
        return care_needs

class SymptomProgressionPredictor:
    def __init__(self):
        self.model = RandomForestClassifier(
            n_estimators=200,
            max_depth=8,
            min_samples_split=4,
            class_weight='balanced',
            random_state=42
        )
        self.scaler = StandardScaler()
        
    def predict_progression(self, patient_data):
        X_processed = self.preprocess_features(pd.DataFrame([patient_data]))
        probabilities = self.model.predict_proba(X_processed)[0]
        
        symptoms_progression = {
            'high_risk_symptoms': self._get_high_risk_symptoms(probabilities),
            'expected_changes': self._predict_symptom_changes(patient_data),
            'recommended_monitoring': self._get_monitoring_recommendations(probabilities)
        }
        return symptoms_progression
        
    def _get_high_risk_symptoms(self, probabilities):
        symptom_risks = []
        symptoms = [
            'breathing_difficulty', 'severe_pain', 'confusion',
            'appetite_loss', 'fatigue', 'nausea'
        ]
        
        for symptom, prob in zip(symptoms, probabilities):
            if prob > 0.3:
                symptom_risks.append({
                    'symptom': symptom,
                    'risk_level': prob,
                    'timeframe': '24-48 hours' if prob > 0.7 else '3-7 days'
                })
        return symptom_risks