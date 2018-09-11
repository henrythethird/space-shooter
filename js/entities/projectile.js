class Projectile {
    constructor(posX, posY) {
        this.x = posX;
        this.y = posY;
        this.z = 0;
        this.w = 20;
        this.h = 10;

        this.enabled = true;

        this.image = resources.getImage(IMAGE_PROJECTILE);

        this.soundEffect = resources.getAudio(SOUND_PROJECTILE);
        this.soundEffect.volume = 0.3;
        this.soundEffect.play();
    }

    onCollide(other) {
        if (other instanceof Enemy) {
            this.enabled = false;
            other.health--;
        }
    }

    update() {
        this.x += settings.projectile.speed;
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
        return new BoundingRect(this.x, this.y, this.w, this.h);
    }
}
