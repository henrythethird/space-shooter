class HUD {
    constructor(posX, posY, amount) {
        this.x = posX;
        this.y = posY;

        this.amount = amount;
        this.score = 0;

        this.heartImage = new Image();
        this.heartImage.src = "resources/images/heart.png";
    }

    onCollide() {}

    draw() {
        for (var i = 0; i < this.amount; i++) {
            context.drawImage(this.heartImage, this.x + i * 40, this.y, 30, 22);
        }

        context.font = "30px 'Bungee Shade'";
        context.fillStyle = "white";
        context.textAlign = "right";
        context.fillText(this.score, settings.width - 50, 50);
    }
}
