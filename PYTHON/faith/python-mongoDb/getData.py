
def getData(db):
    users = db.get_collection("users")
    allusers = users.find().sort("name", 1)
    for user in allusers:
        print(user)

def getBooks(db):
    books = db.get_collection("books")
    allbooks = books.find().sort("title", -1)
    for book in allbooks:
        print(book)