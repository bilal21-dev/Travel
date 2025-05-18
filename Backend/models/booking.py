# from mongoengine import Document, ReferenceField, DateTimeField
# from models.user import User
# from models.trip import Trip
# import datetime

# class Booking(Document):
#     user = ReferenceField(User, required=True)
#     trip = ReferenceField(Trip, required=True)
#     created_at = DateTimeField(default=datetime.datetime.utcnow)


from mongoengine import Document, ReferenceField, DateTimeField
from models.user import User
from models.trip import Trip
import datetime

class Booking(Document):
    user = ReferenceField(User, required=True)
    trip = ReferenceField(Trip, required=True)
    created_at = DateTimeField(default=datetime.datetime.utcnow)

    def to_json(self):
       return {
        "id": str(self.id),
        "user": str(self.user.id) if self.user else None,
        "trip": self.trip.to_json() if self.trip else None,
        "created_at": self.created_at.isoformat()
    }
