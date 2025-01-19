from datetime import datetime, timedelta
import numpy as np
from ..models.ml_models import CareNeedsPredictor, SymptomProgressionPredictor

class HospiceCareService:
    def __init__(self):
        self.care_predictor = CareNeedsPredictor()
        self.symptom_predictor = SymptomProgressionPredictor()
        
    def get_care_recommendations(self, patient_data):
        care_needs = self.care_predictor.predict_care_needs(patient_data)
        symptom_progression = self.symptom_predictor.predict_progression(patient_data)
        
        return {
            'immediate_care_needs': {
                'daily_care_hours': care_needs['daily_care_hours'],
                'caregiver_tasks': self._generate_caregiver_tasks(care_needs),
                'equipment_needs': self._predict_equipment_needs(patient_data, care_needs)
            },
            'symptom_management': {
                'high_risk_symptoms': symptom_progression['high_risk_symptoms'],
                'monitoring_schedule': self._create_monitoring_schedule(symptom_progression),
                'intervention_triggers': self._define_intervention_triggers(symptom_progression)
            },
            'comfort_measures': self._recommend_comfort_measures(care_needs, symptom_progression),
            'caregiver_support': {
                'respite_care_needed': care_needs['daily_care_hours'] > 12,
                'skill_training_needed': self._identify_training_needs(care_needs),
                'support_resources': self._recommend_support_resources(care_needs)
            }
        }
    
    def _generate_caregiver_tasks(self, care_needs):
        tasks = []
        if care_needs['pain_management_level'] > 3:
            tasks.append({
                'task': 'Pain assessment and medication',
                'frequency': 'Every 4-6 hours',
                'priority': 'High',
                'instructions': 'Use pain scale, document responses, contact hospice if pain > 7/10'
            })
        # Add more task generation logic based on care needs
        return tasks
    
    def _create_monitoring_schedule(self, progression):
        schedule = []
        for symptom in progression['high_risk_symptoms']:
            frequency = '2 hours' if symptom['risk_level'] > 0.7 else '4 hours'
            schedule.append({
                'symptom': symptom['symptom'],
                'check_frequency': frequency,
                'what_to_monitor': self._get_monitoring_parameters(symptom['symptom']),
                'warning_signs': self._get_warning_signs(symptom['symptom'])
            })
        return schedule
    
    def _define_intervention_triggers(self, progression):
        triggers = []
        for symptom in progression['high_risk_symptoms']:
            triggers.append({
                'symptom': symptom['symptom'],
                'call_hospice_if': self._get_critical_thresholds(symptom['symptom']),
                'immediate_actions': self._get_immediate_actions(symptom['symptom']),
                'emergency_signs': self._get_emergency_signs(symptom['symptom'])
            })
        return triggers