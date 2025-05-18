from flask import jsonify
from models.trip import Trip

def handle_delete_trip(trip_id):
    try:
        print(trip_id)
        trip = Trip.objects(id=trip_id).first()
        if not trip:
            return jsonify({"error": "Trip not found"}), 404
        
        trip.delete()
        return jsonify({"message": "Trip deleted successfully"}), 200

    except Exception as e:
        print(e)
        return jsonify({"error": "An error occurred while deleting the trip"}), 500
