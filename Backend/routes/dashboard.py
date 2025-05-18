# routes/dashboard.py
from flask import Blueprint, request
from controllers.dashboard import (
    create_dashboard,
    handle_tour_count,
    handle_booking_count,
    handle_expense_count,
    handle_dashboard_data
)

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/create', methods=['POST'])
def dashboard_create():
    return create_dashboard(request)

@dashboard_bp.route('/tourcount', methods=['PUT'])
def tour_count():
    return handle_tour_count(request)

@dashboard_bp.route('/bookingcount', methods=['PUT'])
def booking_count():
    return handle_booking_count(request)

@dashboard_bp.route('/expensecount', methods=['PUT'])
def expense_count():
    return handle_expense_count(request)

@dashboard_bp.route('/<id>', methods=['GET'])
def get_dashboard(id):
    return handle_dashboard_data(id)
