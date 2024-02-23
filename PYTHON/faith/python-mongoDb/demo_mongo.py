from pymongo.mongo_client import MongoClient
from getData import getData
from deleteData import deleteData
from updateData import updateData
from pymongo.server_api import ServerApi

username = "charlykso141"
password = "gDFm3H8m6dybaaLv"
# Connect to the MongoDB server
try:
    client = MongoClient(
        f"mongodb+srv://{username}:{password}@cluster0.vdqo7oo.mongodb.net/?retryWrites=true&w=majority&tls=true", server_api=ServerApi('1'))
    
    print("Connected to the MongoDB server")
    db = client["mydatabase"]
    # getData(db)
    # deleteData(db)
    updateData(db)
except Exception as e:
    print("Error connecting to the MongoDB server: ", e)
finally:
    client.close()
    print("Disconnected from the MongoDB server")


# try:
#     db = client["mydatabase"]
#     users = db.get_collection("users")
#     user1 = {"name": "John", "address": "Highway 37"}
#     user2 = {"name": "Peter", "address": "Lowstreet 27"}
#     user3 = {"name": "Amy", "address": "Apple st 652"}
#     x = users.insert_many([user1, user2, user3])
#     print(x.inserted_ids)
# except Exception as e:
#     print("Error inserting documents: ", e)
# finally:
#     client.close()
#     print("Disconnected from the MongoDB server")


