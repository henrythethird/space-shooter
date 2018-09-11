class Enemy {
    constructor(posX, posY) {
        this.x = posX;
        this.y = posY;
        this.z = 0;

        this.w = 75;
        this.h = 50;

        this.enabled = true;

        const index = Math.floor(Math.random() * 5) + 1;

        this.spaceshipImage = resources.getImage("enemy" + index);
        this.explosionSound = resources.getAudio(SOUND_EXPLODE);

        this.health = settings.enemy.health;
    }

    update() {
        this.x -= settings.enemy.speed;

        if (this.health <= 0) {
            this.kill();
            this.drop();
        }
    }

    kill() {
        hud.score += settings.enemy.score;
        this.enabled = false;
        this.explosionSound.play();

        animations.create(
            ANIMATION_EXPLOSION, this.x, this.y, 
            (anim) => {
                anim.x -= settings.enemy.speed;
            }
        );
    }

    drop() {
        if (Math.random() < .05) {
            spawner.spawn(ENTITY_HEALTHPACK, this.x + 40, this.y + 40);
            return;
        }

        if (Math.random() < .025) {
            spawner.spawn(ENTITY_POWERUP, this.x + 40, this.y + 40);
            return;
        }
    }

    onCollide(other) {
        if (other instanceof Player) {
            this.kill();
        }
    }

    draw() {
        if (!this.enabled) {
            return;
        }

        context.drawImage(
            this.spaceshipImage, this.x, this.y, this.w, this.h
        );
    }

    getBoundingRect() {
        return new BoundingRect(this.x, this.y, this.w, this.h);
    }
}
