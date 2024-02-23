import json

x = '{"name":"John", "age":30, "city":"New York"}'
j = json.loads(x)
print(j["name"])
print(x)

y = json.dumps(j)
print(y)

x = {
    "name": "John",
    "age": 30,
    "married": True,
    "divorced": False,
    "children": ("Ann", "Billy"),
    "pets": None,
    "cars": [
        {"model": "BMW 230", "mpg": 27.5},
        {"model": "Ford Edge", "mpg": 24.1}
    ]
}
print(json.dumps(x, indent=4, separators=(", ", " : "), sort_keys=True))