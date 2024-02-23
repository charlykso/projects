# set
mySet1 = {1, 2, 3, 4, 5}
mySet2 = {4, 5, 6, 7, 8}
# mySet1.intersection_update(mySet2)
# print(mySet1.intersection(mySet2))
print(mySet1)
mySet1.symmetric_difference_update(mySet2)
print(mySet1)

# dictionary
myDict = {
    'name': 'james',
    'age': 33,
    'address': 'seoul'
}
print(myDict)
print(myDict['address'])
print(myDict.get('name'))
print(myDict.keys())
print(myDict.values())
print(myDict.items())
for key in myDict:
    print(myDict[key])
for key, value in myDict.items():
    print(key, value)

dict1 = {
    'name': 'james',
    'age': 33,
    'address': 'seoul'
}
dict2 = dict1.copy()
dict2['name'] = 'james2'
print(dict1)
print(dict2)

# nested dictionary
myDict = {
    'name': 'james',
    'age': 33,
    'address': {
        'zipcode': '12345',
        'city': 'seoul'
    },
    'contact': {
        'email': 'ikenna@gmail.com',
        'phone': {
            'home': '123-123-1234',
            'office': '163-124-1234'
        }
    }
}
print(myDict['contact']['phone']['office'])

a = 10
b = 20
c = 30
d = 40
name = 'james'

def addItems(*a, **b):
    print(b)
    return sum(a)

print(addItems(a, b, c, d, name=name))

def defaultFuntion(a = 2, b = 5, c=10):
    return a + b + c

print(defaultFuntion(1))

def positionaArguments(a):
    return a
print(positionaArguments(a = 3))

def keywordArguments(*, a):
    return a
print(keywordArguments(a = 4))

# recursion
def tri_recursion(k):
    if k > 0:
        result = k + tri_recursion(k-1)
        # print(result)
    else:
        result = 0
    return result
print(tri_recursion(6))