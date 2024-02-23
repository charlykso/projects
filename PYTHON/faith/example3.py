
print(ord('a'))
print(chr(97))
str = "Hello World"
str1 = "hello world"
str2 = "HELLO WORLD"

def _isAll_lower(str):
    for i in str:
        if ord(i) >= 64 and ord(i) <= 96:
            return False
    return True

print(_isAll_lower(str1))

def _isAll_Numeric(str):
    for i in str:
        if not (ord(i) >= 48 and ord(i) <= 57):
            return False
    return True

print(_isAll_Numeric("12a34"))
print(ord(" "))

# tuple
tup = ("cherry", "apple", "banana")
print(type(tup))
(t1, t2, t3) = tup
print(t1)
print(t2)
print(t3)

i = (1, 2, 3)
j = ("a", "b", "c")
k = i + j
print(k)
print(j * 2)
