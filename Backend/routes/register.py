# routes/register.py
from flask import Blueprint, request, jsonify
from controllers.register import handle_signup, handle_login

register_bp = Blueprint('register', __name__)

@register_bp.route('/signup', methods=['POST'])
def signup():
    return handle_signup(request)

@register_bp.route('/login', methods=['POST'])
def login():
    return handle_login(request)
