
def _find(str, ch):
    for i in str:
        if i == ch:
            return str.index(i)
    return -1

Str = "Hello World"
# print(_find(str, "o"))

def _findAll(str, ch):
    index = []
    j = 0
    for i in str:
        if i == ch:
            index.append(j)
        j += 1
    return index

# print(_findAll(str, "o"))

def _count(str, ch):
    return sum(1 for i in str if i == ch)

print(_count(Str, "H"))


# boolean
print("Boolean")
print(bool(""))
x = 5
print(isinstance(x, str))

# insert in a list
print("Insert in a list")
thislist = ["apple", "banana", "cherry"]
thislist.insert(1, "orange")
print(thislist)
[print(x) for x in thislist]
k = [x for x in thislist if "a" in x]
print(k)
evenNums = [x for x in range(10) if x % 2 == 0]
print(evenNums)

# sort a list
print("Sort a list")
mylist = [100, 50, 65, 82, 23]
def myfunc(n):
    return abs(n - 50)
mylist.sort(key=myfunc)
print(mylist)
mylist = ["banana", "Orange", "Kiwi", "cherry"]
mylist.sort(key=str.lower)
print(mylist)