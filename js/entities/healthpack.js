class Healthpack {
    constructor(posX, posY) {
        this.x = posX;
        this.y = posY;
        this.z = 0;

        this.w = 35;
        this.h = 35;

        this.enabled = true;

        this.image = resources.getImage(IMAGE_HEALTHPACK);
    }
    
    update() {
        this.x -= settings.enemy.speed;
    }

    draw() {
        if (!this.enabled) {
            return;
        }

        context.drawImage(
            this.image, this.x, this.y, this.w, this.h
        );
    }

    getBoundingRect() {
        return new BoundingRect(
            this.x, this.y, this.w, this.h
        );
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