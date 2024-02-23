
def deleteData(db):
    users = db.get_collection("users")
    x = users.delete_one({"name": "John"})
    print(x.deleted_count, " document deleted.")
    for x in users.find():
        print(x)
    