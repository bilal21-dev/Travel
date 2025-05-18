# routes/delete_trip.py
from flask import Blueprint
from controllers.delete_trip import handle_delete_trip

delete_trip_bp = Blueprint('delete_trip', __name__)

@delete_trip_bp.route('/<id>', methods=['DELETE'])
def delete_trip(id):
    print("andr agy ahu")
    print(id)
    return handle_delete_trip(id)
