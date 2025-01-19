// # Project Structure
// cancer_prediction/
// ├── .env
// ├── requirements.txt
// ├── run.py
// ├── instance/
// ├── app/
// │   ├── __init__.py
// │   ├── models/
// │   │   ├── __init__.py
// │   │   ├── ml_models.py
// │   │   └── database.py
// │   ├── routes/
// │   │   ├── __init__.py
// │   │   ├── auth.py
// │   │   └── prediction.py
// │   ├── services/
// │   │   ├── __init__.py
// │   │   └── ml_service.py
// │   └── utils/
// │       ├── __init__.py
// │       └── preprocessing.py
// └── ml/
//     ├── train.py
//     ├── evaluate.py
//     └── models/
//         ├── severity_model.pkl
//         └── symptoms_model.pkl

// # app/models/ml_models.py
// from sklearn.ensemble import RandomForestClassifier, GradientBoostingRegressor
// from sklearn.preprocessing import StandardScaler
// import numpy as np
// import pandas as pd
// from sklearn.model_selection import train_test_split, cross_val_score
// from sklearn.metrics import accuracy_score, mean_squared_error, classification_report
// import joblib

// class SeverityPredictor:
//     def __init__(self):
//         self.model = RandomForestClassifier(
//             n_estimators=100,
//             max_depth=10,
//             min_samples_split=5,
//             min_samples_leaf=2,
//             random_state=42
//         )
//         self.scaler = StandardScaler()
        
//     def preprocess_features(self, X):
//         features = [
//             'age', 'stage', 'symptom_score', 'previous_conditions',
//             'treatment_history', 'genetic_risk_score'
//         ]
//         return self.scaler.transform(X[features])
        
//     def train(self, X, y):
//         X_processed = self.preprocess_features(X)
//         self.model.fit(X_processed, y)
        
//     def predict(self, X):
//         X_processed = self.preprocess_features(X)
//         return self.model.predict_proba(X_processed)

// class SymptomPredictor:
//     def __init__(self):
//         self.model = GradientBoostingRegressor(
//             n_estimators=100,
//             learning_rate=0.1,
//             max_depth=5,
//             random_state=42
//         )
//         self.scaler = StandardScaler()
        
//     def preprocess_features(self, X):
//         features = [
//             'age', 'stage', 'days_elapsed', 'current_symptoms',
//             'treatment_response', 'comorbidities'
//         ]
//         return self.scaler.transform(X[features])
        
//     def train(self, X, y):
//         X_processed = self.preprocess_features(X)
//         self.model.fit(X_processed, y)
        
//     def predict(self, X):
//         X_processed = self.preprocess_features(X)
//         return self.model.predict(X_processed)

// # app/services/ml_service.py
// import joblib
// import pandas as pd
// from ..models.ml_models import SeverityPredictor, SymptomPredictor

// class MLService:
//     def __init__(self):
//         self.severity_model = joblib.load('ml/models/severity_model.pkl')
//         self.symptoms_model = joblib.load('ml/models/symptoms_model.pkl')
        
//     def predict_severity(self, patient_data):
//         df = pd.DataFrame([patient_data])
//         severity_prob = self.severity_model.predict_proba(df)[0]
//         return {
//             'severity_score': float(severity_prob[1]),
//             'confidence': float(max(severity_prob)),
//             'risk_level': 'High' if severity_prob[1] > 0.7 else 'Medium' if severity_prob[1] > 0.3 else 'Low'
//         }
        
//     def predict_symptoms(self, patient_data):
//         df = pd.DataFrame([patient_data])
//         predicted_symptoms = self.symptoms_model.predict(df)
//         return {
//             'predicted_symptoms': predicted_symptoms.tolist(),
//             'confidence_scores': self.symptoms_model.feature_importances_.tolist()
//         }

// # app/routes/prediction.py
// from flask import Blueprint, request, jsonify
// from ..services.ml_service import MLService
// from flask_login import login_required

// prediction_bp = Blueprint('prediction', __name__)
// ml_service = MLService()

// @prediction_bp.route('/predict/severity', methods=['POST'])
// @login_required
// def predict_severity():
//     try:
//         data = request.get_json()
//         prediction = ml_service.predict_severity(data)
//         return jsonify(prediction), 200
//     except Exception as e:
//         return jsonify({'error': str(e)}), 400

// @prediction_bp.route('/predict/symptoms', methods=['POST'])
// @login_required
// def predict_symptoms():
//     try:
//         data = request.get_json()
//         prediction = ml_service.predict_symptoms(data)
//         return jsonify(prediction), 200
//     except Exception as e:
//         return jsonify({'error': str(e)}), 400