class Asteroid {
    constructor(posX, posY) {
        this.x = posX;
        this.y = posY;

        this.enabled = true;

        this.image = new Image();
        this.image.src = "resources/images/asteroids.png";

        this.imageId = Math.floor(Math.random() * 5);

        if (Math.random() > .9) {
            this.z = 10;
            this.multiplier = Math.random() * 1 + 1.5;
        } else {
            this.z = -10;
            this.multiplier = Math.random() * .5 + .5;
        }
    }

    update() {
        this.x -= 3 * this.multiplier;
    }

    draw() {
        const dx = (this.imageId % 2) * 128;
        const dy = (this.imageId % 2) * 128;
        context.drawImage(this.image, dx, dy, 128, 128, this.x, this.y, 40 * this.multiplier, 40 * this.multiplier);
    }
}
