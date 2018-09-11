class Projectile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.z = 0;
        this.w = 20;
        this.h = 10;

        this.enabled = true;

        this.image = resources.getImage(IMAGE_PROJECTILE);

        this.soundEffect = resources.getAudio(SOUND_PROJECTILE);
        this.soundEffect.volume = 0.3;
        this.soundEffect.play();

        this.direction = 1;
        this.evil = false;
    }

    onCollide(other) {
        if ((!this.evil && other instanceof Enemy)
         || (this.evil && other instanceof Player)) 
        {
            this.enabled = false;
            other.damage(1);
        }
    }

    update() {
        this.x += settings.projectile.speed * this.direction;
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
