# routes/create_trip.py
from flask import Blueprint, request
from controllers.create_trip import handle_trip_data
from werkzeug.utils import secure_filename
import os
from datetime import datetime

create_trip_bp = Blueprint('create_trip', __name__)
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@create_trip_bp.route('/trip', methods=['POST'])
def create_trip():
    if 'image' not in request.files:
        return {"error": "No image uploaded"}, 400
    
    image = request.files['image']
    filename = f"{int(datetime.now().timestamp())}-{secure_filename(image.filename)}"
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    image.save(filepath)
    print("ja rha hu")

    return handle_trip_data(request, filename)
