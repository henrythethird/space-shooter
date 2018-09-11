class Healthpack {
    constructor(posX, posY) {
        this.x = posX;
        this.y = posY;

        this.enabled = true;

        this.image = new Image();
        this.image.src = "resources/images/healthpack.png";
    }
    
    update() {
        this.x -= settings.speed;
    }

    draw() {
        if (!this.enabled) {
            return;
        }

        context.drawImage(this.image, this.x, this.y, 35, 35);
    }

    getBoundingRect() {
        return new BoundingRect(this.x, this.y, 35, 35);
    }

    onCollide(other) {
        if (!other.enabled){
            return;
        }

        if (other instanceof Player) {
            this.enabled = false;

            other.health++;
        }
    }
}