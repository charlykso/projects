import re

txt = "The rain in Spain"
x = re.search("^The.*Spain$", txt)
if x:
    print("YES! We have a match!")

y = re.findall("ai", txt)
print(y)

ex = {
    "t": "7",
    "a": "4",
    "i": "1",
    "z": "2",
    "o": "0",
    "s": "5",
    "g": "9",
    "b": "6",
    "e": "3",
    "B": "8",
}

i = re.search(r"\bS\w+", txt)
print(i.span())