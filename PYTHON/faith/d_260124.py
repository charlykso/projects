
class Vehicle:
    def __init__(self, brand, name):
        self.brand = brand
        self.name = name
    
    def __str__(self):
        return f"{self.brand} {self.name}"
    
    def move(self):
        print("move")

class Car(Vehicle):
    pass

class Boat(Vehicle):
    def move(self):
        print("float")

class Plane(Vehicle):
    def move(self):
        print("fly")

car1 = Car("Toyota", "Corolla")
boat1 = Boat("Yamaha", "Yacht")
plane1 = Plane("Boeing", "747")

for v in [car1, boat1, plane1]:
    v.move()