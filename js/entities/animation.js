class Animation {
    constructor(posX, posY, w, h, image, frameX, frameY, cb) {
        this.x = posX;
        this.y = posY;
        this.width = w;
        this.height = h;

        this.image = new Image();
        this.image.src = image;

        this.frameX = frameX;
        this.frameY = frameY;

        this.frameSkip = 0;
        this.frameId = 0;

        this.updateCallback = cb;

        this.enabled = true;
    }

    update() {
        this.updateCallback(this);    

        if (this.frameSkip % 5 == 0) {
            this.frameId++;
        }
    }

    draw() {
        const fw = 900 / this.frameX;

        const offsetY = Math.floor(this.frameId / fw) * this.frameY;
        const offsetX = (this.frameId % fw) * this.frameX;

        context.drawImage(
            this.image, 
            offsetX, offsetY, this.frameX, this.frameY,
            this.x, this.y, this.width, this.height
        );
    }
}