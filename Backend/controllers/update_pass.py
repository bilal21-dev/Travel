from flask import request, jsonify
from models.user import User
from werkzeug.security import generate_password_hash

def handle_update_pass():
    data = request.get_json()
    email = data.get("email")
    new_password = data.get("newPassword")
    print(email, new_password)

    if not email or not new_password or len(new_password) < 6:
        return jsonify({"error": "Invalid input"}), 400

    try:
        user = User.objects(email=email).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        hashed_password = generate_password_hash(new_password)
        user.password = hashed_password
        user.save()

        return jsonify({"success": True, "message": "Password updated successfully"}), 200

    except Exception as e:
        print("Error updating password:", e)
        return jsonify({"error": "Internal server error"}), 500
