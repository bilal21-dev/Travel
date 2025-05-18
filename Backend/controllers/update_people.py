from flask import request, jsonify
from models.trip import Trip

def handle_update_people(request,trip_id):
    try:
        data = request.get_json()
        people = int(data.get("people"))
        
       
        if not people or people <= 0:
            return jsonify({"error": "Invalid number of people"}), 400

        trip = Trip.objects(id=trip_id).modify(
            inc__registration=people,  # Atomic increment
            new=True  # Return updated document
        )

        if not trip:
            return jsonify({"error": "Trip not found"}), 404

        return jsonify({"message": "Booking updated successfully"}), 200

    except Exception as e:
        print("Error updating people:", e)
        return jsonify({"error": "Internal server error"}), 500
