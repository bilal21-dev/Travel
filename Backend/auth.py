from functools import wraps
from flask import request, jsonify
import jwt
from key import JWT_SECRET  # Your secret key

def authenticate_token(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({'error': 'Access denied. No token provided.'}), 401

        token = auth_header.split(" ")[1]

        try:
            decoded = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
            request.user = decoded  # Attach decoded user data to request
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired.'}), 403
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token.'}), 403

        return f(*args, **kwargs)
    return decorated
