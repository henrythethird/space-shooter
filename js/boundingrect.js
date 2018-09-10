class BoundingRect {
    constructor(posX, posY, width, height) {
        this.x = posX;
        this.y = posY;
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
