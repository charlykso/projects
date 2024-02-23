x = lambda a, b, c: a + b + c
print(x(5, 6, 2))

def myFunction(n):
    return lambda a : a * n

y = myFunction(2)
print(y(11))

class MyClass:
    def __init__(self, x):
        self.x = x

p1 = MyClass(8)
# p1.x = 10
print(p1.x)

class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __str__(self):
        return self.name + " " + str(self.age)
    
    def myfunc(self):
        print("Hello my name is " + self.name)

p2 = Person("John", 36)
print(p2.name)
print(p2.age)
print(p2)
p2.myfunc()
p3 = Person("Mike", 25)
print(p3)
p3.name = "Bob"
p3.myfunc()
