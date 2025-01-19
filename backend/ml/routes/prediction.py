from flask import Blueprint, request, jsonify
from ..services.ml_service import HospiceCareService
from flask_login import login_required

hospice_bp = Blueprint('hospice', __name__)
hospice_service = HospiceCareService()

@hospice_bp.route('/predict/care_needs', methods=['POST'])
@login_required
def predict_care_needs():
    try:
        data = request.get_json()
        recommendations = hospice_service.get_care_recommendations(data)
        return jsonify({
            'status': 'success',
            'recommendations': recommendations,
            'generated_at': datetime.now().isoformat(),
            'valid_for_hours': 24
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    