class Projectile {
    constructor(posX, posY) {
        this.x = posX;
        this.y = posY;
        this.z = 0;
        this.enabled = true;

        this.projectileImage = new Image();
        this.projectileImage.src = "resources/images/projectile.png";

        this.soundEffect = new Audio("resources/sound/projectile.ogg");
        this.soundEffect.volume = 0.3;
        this.soundEffect.play();
    }

    onCollide() {}

    update() {
        this.x += settings.projectileSpeed;
    }

    draw() {
        if (!this.enabled) {
            return;
        }

        context.drawImage(this.projectileImage, this.x, this.y, 20, 10);
    }

    getBoundingRect() {
        return new BoundingRect(this.x, this.y, 20, 10);
    }
}
