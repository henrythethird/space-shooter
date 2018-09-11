class Asteroid {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.enabled = true;

        this.image = resources.getImage(IMAGE_ASTEROIDS);

        this.imageId = Math.floor(Math.random() * 4);

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
        const dy = Math.floor(this.imageId / 2) * 128;
        context.drawImage(this.image, dx, dy, 128, 128, this.x, this.y, 40 * this.multiplier, 40 * this.multiplier);
    }
}
