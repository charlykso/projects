
def updateData(db):
    users = db.get_collection("users")
    x = users.update_one({"name": "John"}, {"$set": {"name": "Mike"}})
    print(x.modified_count, " document updated.")
    for user in users.find().limit(2):
        print(user)