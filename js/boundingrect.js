class BoundingRect {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    collides(other) {
        return !(other.x > (this.x + this.width) || 
            (other.x + other.width) < this.x || 
            other.y > (this.y + this.height) ||
            (other.y + other.height) < this.y);
    }
}
