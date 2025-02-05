class Upgrade {
    constructor(x, y, image, effectCB) {
        this.x = x;
        this.y = y;
        this.z = 0;

        this.w = 35;
        this.h = 35;

        this.enabled = true;

        this.image = image;
        this.effectCB = effectCB;
    }
    
    update() {
        this.x -= settings.enemy.speed / 2;
    }

    draw() {
        if (!this.enabled) return;

        context.drawImage(
            this.image, this.x, this.y, this.w, this.h
        );
    }

    getBoundingRect() {
        return new BoundingRect(
            this.x, this.y, this.w, this.h
        );
    }

    onCollide(player) {
        if (!player.enabled) return;
        if (!(player instanceof Player)) return;

        this.effectCB(this, player);
    }
}