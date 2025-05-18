from flask import request, jsonify
from models.dashboard import Dashboard
from mongoengine.queryset.visitor import Q

def create_dashboard(req):
    try:
        author = req.get_json().get('author')
        dashboard = Dashboard(author=author)
        dashboard.save()
        return jsonify({"message": "Dashboard initialized", "dashboard": dashboard.to_json()}), 201
    except Exception as e:
        print(e)
        return jsonify({"error": "Internal error"}), 500

def handle_tour_count(req):
    try:
        data = req.get_json()
        user_id = data.get("id")
        action = data.get("action")

        if not user_id or action not in ["increase", "decrease"]:
            return jsonify({"error": "Invalid request parameters"}), 400

        update_value = 1 if action == "increase" else -1

        updated_dashboard = Dashboard.objects(author=user_id).modify(
            inc__tours=update_value, new=True
        )

        if not updated_dashboard:
            return jsonify({"error": "Dashboard not found"}), 404

        return jsonify(updated_dashboard.to_json()), 200

    except Exception as e:
        print("Error updating tour count:", e)
        return jsonify({"error": "Internal Server Error"}), 500

def handle_booking_count(req):
    try:
        user_id = req.get_json().get("id")

        updated_dashboard = Dashboard.objects(author=user_id).modify(
            inc__bookings=1, new=True
        )

        if not updated_dashboard:
            return jsonify({"error": "Dashboard not found"}), 404

        return jsonify(updated_dashboard.to_json()), 200

    except Exception as e:
        print("Error updating booking count:", e)
        return jsonify({"error": "Internal Server Error"}), 500

def handle_expense_count(req):
    try:
        data = req.get_json()
        user_id = data.get("id")
        amount = data.get("amount")

        updated_dashboard = Dashboard.objects(author=user_id).modify(
            inc__total_expenses=amount, new=True
        )

        if not updated_dashboard:
            return jsonify({"error": "Dashboard not found"}), 404

        return jsonify(updated_dashboard.to_json()), 200

    except Exception as e:
        print("Error updating expense count:", e)
        return jsonify({"error": "Internal Server Error"}), 500

def handle_dashboard_data(user_id):
    try:
        dashboard = Dashboard.objects(author=user_id).first()
        print(dashboard.to_json())
        if not dashboard:
            return jsonify({"error": "Dashboard not found"}), 404

        return jsonify(dashboard.to_json()), 200

    except Exception as e:
        print("Error fetching dashboard data:", e)
        return jsonify({"error": "Internal Server Error"}), 500
