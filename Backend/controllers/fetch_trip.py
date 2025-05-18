from flask import request, jsonify
from models.trip import Trip
from models.user import User

def handle_get_trips(user_id):
    try:
        user = User.objects(id=user_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        my_trips = Trip.objects(author=user_id)
        trips_list = [trip.to_json() for trip in my_trips]
        return jsonify({"myTrips": trips_list}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


def handle_search_trips():
    try:
        destination = request.args.get("destination")
        start_date = request.args.get("startDate")

        trips = Trip.objects(destination=destination, start_date=start_date)
        trips_list = [trip.to_json() for trip in trips]
        return jsonify(trips_list), 200

    except Exception as e:
        return jsonify({"error": "Internal Server Error"}), 500

def handle_get_one_trip(trip_id):
    try:
        trip = Trip.objects(id=trip_id).first()
        if not trip:
            return jsonify({"error": "Trip not found"}), 404
        return jsonify({"myTrip": trip.to_json()}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
