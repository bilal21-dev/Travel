from models.user import User
from models.trip import Trip
from models.booking import Booking  # Assuming this is your model
from mongoengine import ValidationError
from flask import jsonify

def handle_bookings(req):
    data = req.get_json()
    user_id = data.get('id')
    trip_id = data.get('tripID')
    if not user_id or not trip_id:
        return jsonify({"error": "Missing user ID or trip ID"}), 400

    try:
        user = User.objects(id=user_id).first()
        trip = Trip.objects(id=trip_id).first()

        if not user or not trip:
            return jsonify({"error": "User or Trip not found"}), 404

        new_booking = Booking(user=user, trip=trip)
        new_booking.save()

        return jsonify({
            "message": "Trip booked successfully!",
            "booking": new_booking.to_json()
        }), 201

    except ValidationError as e:
        print(e)
        return jsonify({"error": "Validation Error"}), 400
    except Exception as e:
        print(e)
        return jsonify({"error": "Server Error"}), 500

# def get_bookings(user_id):
#     try:
#         bookings = Booking.objects(user=user_id).select_related()
#         return jsonify([b.to_mongo().to_dict() for b in bookings]), 200
#     except Exception as e:
#         print(e)
#         return jsonify({"error": "Server Error"}), 500

def get_bookings(user_id):
    try:
        bookings = Booking.objects(user=user_id).select_related()
        return jsonify([b.to_json() for b in bookings]), 200
    except Exception as e:
        print("Error in get_bookings:", e)
        return jsonify({"error": "Server Error"}), 500
