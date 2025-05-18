from flask import request, jsonify
from models.user import User
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from key import JWT_SECRET  # your secret key here

def generate_auth_token(user):
    payload = {
        "_id": str(user.id),
        "email": user.email,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm="HS256")
    return token

def handle_signup(request):
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"result": "Enter complete information"}), 400

    try:
        existing_user = User.objects(email=email).first()
        if existing_user:
            return jsonify({"result": "User already exists"}), 400

        hashed_password = generate_password_hash(password)

        user = User(name=name, email=email, password=hashed_password)
        user.save()

        user_dict = user.to_mongo().to_dict()
        user_dict.pop("password", None)
        user_dict["_id"] = str(user.id)

        token = generate_auth_token(user)

        return jsonify({"user": user_dict, "token": token}), 200

    except Exception as e:
        print("Signup error:", e)
        return jsonify({"result": "Internal server error"}), 500

def handle_login(request):
    data = request.get_json()
    logInMail = data.get("logInMail")
    logInPassword = data.get("logInPassword")

    if not logInMail or not logInPassword:
        return jsonify({"result": "Enter complete details"}), 400

    try:
        user = User.objects(email=logInMail).first()
        if not user:
            return jsonify({"result": "No record"}), 404

        if not check_password_hash(user.password, logInPassword):
            return jsonify({"result": "Invalid credentials"}), 401

        user_dict = user.to_mongo().to_dict()
        user_dict.pop("password", None)
        user_dict["_id"] = str(user.id)

        token = generate_auth_token(user)

        return jsonify({"user": user_dict, "token": token}), 200

    except Exception as e:
        print("Login error:", e)
        return jsonify({"result": "Internal server error"}), 500
