import os
username = input("Enter your username: ")
password = input("Enter your password: ")
# print(f"Your username is {username} and password is {password}")

f = open("./data/demofile.txt", "w")
f.write(f"Your username is {username} and password is {password}")
f.close()
x = open("./data/demofile.txt", "r")
print(x.read())
x.close()

# os.remove("./data/demofile.txt")