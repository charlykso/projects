import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
# from pymongo.server_api import ServerApi

async def main():
    username = "charlykso141"
    password = "gDFm3H8m6dybaaLv"
    uri = f"mongodb+srv://{username}:{password}@cluster0.vdqo7oo.mongodb.net/?retryWrites=true&w=majority&tls=true"
    client = AsyncIOMotorClient(uri)

    try:
        await client.admin.command('ping') 
        print("Connected to the MongoDB server")
        # db = client["mydatabase"]
        # users = await db.get_collection("users")
        # u = await users.find_one({"name": "John"})
        # print(db)
    except Exception as e:
        print("Error connecting to the MongoDB server: ", e)

asyncio.run(main())
