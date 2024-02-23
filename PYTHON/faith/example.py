import random
# print a random text to the console
# print("Hello World!")

x = 5
y = "John"
print(type(y))
# adding type to variables
# x = str(3)

"""
This is a comment
written in
more than just one line
"""

# Python Variables
m, n, o = "Orange", "Banana", "Cherry"
print(m)
print(n)
print(o)

# unpacking a list
print("Unpacking a list")
fruits = ["apple", "banana", "cherry"]
x, y, z = fruits
print(x)
print(y)
print(z)

k = "6"
print(k, 5)

num = 35e3
print(type(num))

num2 = 3 + 5j
print(num2)

# Casting
print("Casting")
x = float(1)
y = int(2.8)
z = int("3")
print(x)
print(y)
print(z)

# Random Number
print("Random Number")
print(random.randrange(1, 10))

# Strings
print("Strings")
a = "Hello, World!"
print(a[4])

for x in "banana":
    print(x)

# String Length
print("String Length")
b = "Hello, World!"
print(len(b))

# Check String
print("Check String")
txt = """
The best things in life are free!
This is a multiline string
"""
print(len(txt))
print("mult" in txt)
txt2 = "The best things in life are free!"
print(txt2[28:])
b = "Hello, World!"
print(b[-5:-2])

# Modify Strings
print("Modify Strings")
a = " Hello, World! "
print(a.strip().split(","))

# String format
print("String format")
age = 36
name = "John"
txt = f"My name is {name}, and I am {age}"
print(txt)

# String Methods
print("String Methods")
txt = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
print(txt.find("e"))
print(txt.count("e"))