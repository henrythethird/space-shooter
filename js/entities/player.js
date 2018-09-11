class Player {
    constructor(posX, posY) {
        this.x = posX;
        this.y = posY;
        this.z = 0;

        this.w = 100;
        this.h = 50;

        this.shuttleImage = resources.getImage(IMAGE_SHUTTLE);
        this.ouchSound = resources.getAudio(SOUND_OUCH);

        this.invulnerabilityCooldown = 0;

        this.health = 5;
        this.enabled = true;

        this.weapon = new SingleShot(this);
    }

    keyboardMove() {
        if (keyboard.isPressed(KEY_LEFT)) this.x -= settings.player.speed;
        if (keyboard.isPressed(KEY_RIGHT)) this.x += settings.player.speed;
        if (keyboard.isPressed(KEY_DOWN)) this.y += settings.player.speed;
        if (keyboard.isPressed(KEY_UP)) this.y -= settings.player.speed;

        if (this.x < 0) this.x = 0;
        if (this.x + this.w > settings.width) this.x = settings.width - this.w;
        if (this.y < 0) this.y = 0;
        if (this.y + this.h > settings.height) this.y = settings.height - this.h;
    }

    keyboardShoot() {
        this.weapon.update();

        if (keyboard.isPressed(KEY_SPACE)) {
            this.weapon.shoot();
        }
    }

    update() {
        if (!this.enabled) {
            return;
        }

        this.invulnerabilityCooldown -= 1;

        this.keyboardMove();
        this.keyboardShoot();

        if (this.health > settings.player.maxHealth){
            this.health = settings.player.maxHealth;
        }

        hud.amount = this.health;
    }

    isInvulnerable() {
        return this.invulnerabilityCooldown > 0
    }

    ouch() {
        if (this.isInvulnerable()) {
            return;
        }

        this.ouchSound.play();
        this.health--;
        this.invulnerabilityCooldown = settings.player.invulnCD;

        if (this.health < 0) {
            this.enabled = false;
        }
    }

    onCollide(other) {
        if (other instanceof Enemy) {
            other.health = 0;
            other.enableDrops = false;

            this.ouch();
        }
    }

    draw() {
        if (!this.enabled) {
            return;
        }

        if (this.isInvulnerable()) {
            context.globalAlpha = 0.5;
        }
        context.drawImage(this.shuttleImage, this.x, this.y, this.w, this.h);
        context.globalAlpha = 1;
    }

    getBoundingRect() {
        return new BoundingRect(this.x, this.y, this.w, this.h);
    }
}
