class Enemy {
    constructor(posX, posY) {
        this.x = posX;
        this.y = posY;
        this.z = 0;

        this.enabled = true;

        const index = Math.floor(Math.random() * 5) + 1;

        this.spaceshipImage = new Image();
        this.spaceshipImage.src = "resources/images/enemy" + index + ".png";

        this.explosionSound = new Audio("resources/sound/explode.ogg");

        this.health = 2;
    }

    update() {
        this.x -= settings.speed;
    }

    kill() {
        hearts.score += 10;
        this.enabled = false;
        this.explosionSound.play();
    }

    onCollide(other) {
        if (other instanceof Projectile) {
            other.enabled = false;
            this.health--;

            if (this.health <= 0) {
                this.kill();
            }
        }

        if (other instanceof Player) {
            this.kill();
        }
    }

    draw() {
        if (!this.enabled) {
            return;
        }

        context.drawImage(this.spaceshipImage, this.x, this.y, 75, 50);
    }

    getBoundingRect() {
        return new BoundingRect(this.x, this.y, 75, 50);
    }
}
