# routes/update_pass.py
from flask import Blueprint, request
from controllers.update_pass import handle_update_pass

update_pass_bp = Blueprint('update_pass', __name__)

@update_pass_bp.route('/update', methods=['PUT'])
def update_password():
    return handle_update_pass()
