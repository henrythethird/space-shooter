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

        drawables.push(new Animation(
            this.x, this.y, 100, 100, 
            "resources/images/explosion.png", 
            100, 100, (anim) => { anim.x -= settings.speed }
        ))
    }

    drop() {
        if (Math.random() < .05) {
            drawables.push(new Healthpack(this.x, this.y));
        }
    }

    onCollide(other) {
        if (other instanceof Projectile) {
            other.enabled = false;
            this.health--;

            if (this.health <= 0) {
                this.kill();
                
                this.drop();
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
