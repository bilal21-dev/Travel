# from mongoengine import Document, ReferenceField, IntField
# from models.user import User

# class Dashboard(Document):
#     author = ReferenceField(User, required=True, unique=True)
#     tours = IntField(default=0)
#     bookings = IntField(default=0)
#     total_expenses = IntField(default=0)


from mongoengine import Document, ReferenceField, IntField
from models.user import User

class Dashboard(Document):
    author = ReferenceField(User, required=True, unique=True)
    tours = IntField(default=0)
    bookings = IntField(default=0)
    total_expenses = IntField(default=0)

    def to_json(self):
        return {
            "id": str(self.id),
            "author": str(self.author.id) if self.author else None,
            "tours": self.tours,
            "bookings": self.bookings,
            "total_expenses": self.total_expenses
        }
