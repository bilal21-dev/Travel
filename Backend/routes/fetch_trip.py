# routes/fetch_trip.py
from flask import Blueprint
from controllers.fetch_trip import (
    handle_get_trips,
    handle_search_trips,
    handle_get_one_trip
)

fetch_trip_bp = Blueprint('fetch_trip', __name__)

@fetch_trip_bp.route('/search', methods=['GET'])
def search_trips():
    return handle_search_trips()

@fetch_trip_bp.route('/<id>', methods=['GET'])
def get_trips(id):
    return handle_get_trips(id)

@fetch_trip_bp.route('/booking/<id>', methods=['GET'])
def get_one_trip(id):
    return handle_get_one_trip(id)
