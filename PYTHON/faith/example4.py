from d_250124 import Person

p4 = Person("Chinwuba", 25)
print(p4)

class Miracle(Person):
    def __init__(self, name, age, height):
        super().__init__(name, age)
        self.height = height
    
    def __str__(self):
        return super().__str__() + " " + str(self.height)

p5 = Miracle("Emmanuel", 25, 5.8)
print(p5)