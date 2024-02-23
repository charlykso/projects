import  d_260124
from d_260124 import Boat as b
import platform
import datetime
import math

car1 = d_260124.Car("Toyota", "Corolla")
car1.move()
boat1 = b("Yamaha", "Yacht")
boat1.move()
x = platform.system()
y = platform.python_version()
k = dir(d_260124)
i = platform.processor()
print(x)
print(y)
print(k)
print(i)

d = datetime.datetime.now()
print(d)
print(d.year)
print(d.strftime("%A, %d %B, %Y"))
print(d.strftime("%A"))

print(math.ceil(1.1))
print(math.floor(1.9))