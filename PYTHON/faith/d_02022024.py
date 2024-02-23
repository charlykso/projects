import json

file_path = '../../JavaScript/Miracle-Chinwuba/data/users.json'

user = {
    "name": "John",
    "age": 30,
    "email": "john@gmail.com",
    "is_active": True,
    "balance": 100.5,
    "address": {
        "street": "Main St",
        "city": "New York"
    }
}
str = json.dumps(user, indent=2, sort_keys=True)
print(str)
# print(json.loads(str))