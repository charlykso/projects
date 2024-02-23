class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

    area() {
        return this.height * this.width
    }

    perimeter() {
        return 2 * (this.height + this.width)
    }

    diagonal() {
        return Math.sqrt(this.height**2 + this.width**2)
    }

    isSquare() {
        return this.height === this.width
    }
}

export default Rectangle;