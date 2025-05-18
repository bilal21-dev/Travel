from flask import jsonify, request
from models.trip import Trip
import os
from datetime import datetime
from models.user import User

def handle_trip_data(req, image_filename):
    try:
        data = req.form  # When using multipart/form-data, use req.form instead of req.json
        title = data.get('title')
        num_people = data.get('numPeople')
        price = data.get('price')
        author = data.get('author')
        destination = data.get('destination')
        start_date = data.get('startDate')
        end_date = data.get('endDate')
        registration = data.get('registration')
     
        image_path = os.path.join("uploads", image_filename) if image_filename else None

        # trip = Trip(
        #     title=title,
        #     num_people=num_people,
        #     price=price,
        #     author=author,
        #     destination=destination,
        #     start_date=start_date,
        #     end_date=end_date,
        #     image=image_path,
        #     registration=registration
        # )
        trip = Trip(
              title=title,
              num_people=int(num_people),
              price=int(price),
              author=User.objects.get(id=author),  # convert author ID string to User object
              destination=destination,
              start_date=datetime.fromisoformat(start_date),
              end_date=datetime.fromisoformat(end_date),
              image=image_path,
              registration=int(registration) if registration else 0
        )



        trip.save()
        return jsonify(trip.to_json()), 201

    except Exception as e:
        print(e)
        return jsonify({"error": "Failed to save trip"}), 500
