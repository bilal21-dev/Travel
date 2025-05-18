from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import datetime
import stripe
from bson.objectid import ObjectId
import models.config
from routes.register import register_bp
from routes.create_trip import create_trip_bp
from routes.fetch_trip import fetch_trip_bp
from routes.delete_trip import delete_trip_bp
from routes.dashboard import dashboard_bp
from routes.update_people import update_people_bp
from routes.update_pass import update_pass_bp
from routes.booking import booking_bp

from mailer import send_otp

# Flask app setup
app = Flask(__name__)
CORS(app)

# File upload config
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# OTP store
otp_store = {}

# Stripe setup
stripe.api_key = "sk_test_51Qw6DeJCipB5xevDwBq8fjhFhCOgQlLZTbsJbIHR3wAxKB9QggoOPI2P0IQRhNOyfukzml7qqqmu1tIzRgJ0ZrtQ00ZP56MSvX"

# Blueprints (Routes)
app.register_blueprint(register_bp, url_prefix='/auth')
app.register_blueprint(create_trip_bp, url_prefix='/create')
app.register_blueprint(fetch_trip_bp, url_prefix='/trips')
app.register_blueprint(delete_trip_bp, url_prefix='/delete')
app.register_blueprint(dashboard_bp, url_prefix='/dashboard')
app.register_blueprint(update_people_bp, url_prefix='/update')
app.register_blueprint(update_pass_bp, url_prefix='/password')
app.register_blueprint(booking_bp, url_prefix='/booking')

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/send-otp', methods=['POST'])
def send_otp_route():
    data = request.get_json()
    email = data.get('email')
    if not email:
        return jsonify({'error': 'Email is required'}), 400

    import random
    otp = ''.join([str(random.randint(0, 9)) for _ in range(6)])
    otp_store[email] = otp

    try:
        send_otp(email, otp)
        print("OTP sent")
        return jsonify({'message': 'OTP sent successfully!'})
    except Exception as e:
        print("OTP error:", str(e))
        return jsonify({'error': 'Failed to send OTP'}), 500

@app.route('/verify-otp', methods=['POST'])
def verify_otp():
    data = request.get_json()
    email = data.get('email')
    otp = data.get('otp')

    if not email or not otp:
        return jsonify({'error': 'Email and OTP are required'}), 400

    stored_otp = otp_store.get(email)
    if stored_otp and stored_otp == otp:
        del otp_store[email]
        print("OTP verified")   
        return jsonify({'message': 'Trip registered.'})
    else:
        return jsonify({'error': 'Invalid OTP or expired OTP'}), 400

@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    data = request.get_json()
    trips = data.get('trips', [])

    line_items = []
    for trip in trips:
        line_items.append({
            'price_data': {
                'currency': 'usd',
                'product_data': {
                    'name': trip['title'],
                    # 'images': [trip['image']] if trip.get('image') else []
                },
                'unit_amount': int(trip['price']) * 100
            },
            'quantity': 1
        })

    session = stripe.checkout.Session.create(
        payment_method_types=['card'],
        line_items=line_items,
        mode='payment',
        success_url='http://localhost:5173/success',
        cancel_url='http://localhost:5173/failure'
    )

    return jsonify({'id': session.id})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
