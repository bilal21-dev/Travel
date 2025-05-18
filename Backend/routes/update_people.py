# routes/update_people.py
from flask import Blueprint, request
from controllers.update_people import handle_update_people

update_people_bp = Blueprint('update_people', __name__)

@update_people_bp.route('/people/<id>', methods=['PUT'])
def update_people(id):
    return handle_update_people(request,id)
