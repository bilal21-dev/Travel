# routes/booking.py
from flask import Blueprint, request
from controllers.booking import handle_bookings, get_bookings

booking_bp = Blueprint('booking', __name__)

@booking_bp.route('/trip', methods=['POST'])
def book_trip():
    return handle_bookings(request)

@booking_bp.route('/<id>', methods=['GET'])
def get_booking(id):
    return get_bookings(id)
