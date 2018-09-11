class Animation {
    constructor(x, y, w, h, image, frameX, frameY, frameSkip, cb) {
        this.x = x;
        this.y = y;
        this.z = -10;

        this.width = w;
        this.height = h;

        this.image = image;

        this.frameX = frameX;
        this.frameY = frameY;

        this.frame = 0;
        this.frameSkip = frameSkip;
        this.frameId = 0;

        this.updateCallback = cb;

        this.enabled = true;
    }

    update() {
        this.updateCallback(this);    

        if (this.frame % this.frameSkip == 0) {
            this.frameId++;
        }
    }

    draw() {
        const fw = this.image.width / this.frameX;

        const offsetY = Math.floor(this.frameId / fw) * this.frameY;
        const offsetX = (this.frameId % fw) * this.frameX;

        if (offsetY >= this.image.height) {
            this.enabled = false;
            return;
        }

        context.drawImage(
            this.image, 
            offsetX, offsetY, this.frameX, this.frameY,
            this.x, this.y, this.width, this.height
        );
    }
}