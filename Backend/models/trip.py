from mongoengine import Document, StringField, IntField, ReferenceField, DateTimeField

from models.user import User

class Trip(Document):
    title = StringField(required=True)
    num_people = IntField(required=True)
    registration = IntField(default=0)
    price = IntField(required=True)
    image = StringField(default="")
    author = ReferenceField(User, required=True)
    destination = StringField(required=True, default="")
    start_date = DateTimeField(required=True)
    end_date = DateTimeField(required=True)

    def to_json(self):
     return {
        "id": str(self.id),
        "title": self.title,
        "num_people": self.num_people,
        "price": self.price,
        "author": str(self.author.id) if self.author else None,
        "destination": self.destination,
        "start_date": self.start_date.isoformat() if self.start_date else None,
        "end_date": self.end_date.isoformat() if self.end_date else None,
        "image": self.image,
        "registration": self.registration
    }
