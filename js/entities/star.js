class Star {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.z = -20;

        this.enabled = true;

        this.color = Math.random() > .9 ? "gold" : "white";

        this.size = Math.floor(Math.random() * 3 + 1);
    }

    update() {
        this.x -= 1;
    }

    draw() {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.size, this.size);
    }
}