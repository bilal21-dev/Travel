from mongoengine import connect

connect('Travel', host='localhost', port=27017)
print("✅ MongoDB connection to 'Travel' database established.")
