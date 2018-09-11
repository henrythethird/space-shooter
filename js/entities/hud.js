class HUD {
    constructor(x, y, amount) {
        this.x = x;
        this.y = y;

        this.amount = amount;
        this.score = 0;

        this.heartImage = resources.getImage(IMAGE_HEART);
    }

    onCollide() {}

    draw() {
        for (var i = 0; i < this.amount; i++) {
            context.drawImage(
                this.heartImage, this.x + i * 40, this.y, 30, 22
            );
        }

        context.font = "30px 'Bungee Shade'";
        context.fillStyle = "white";
        context.textAlign = "right";
        context.fillText(this.score, settings.width - 50, 50);
    }
}
