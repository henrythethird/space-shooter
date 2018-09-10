class Player {
    constructor(posX, posY) {
        this.x = posX;
        this.y = posY;
        this.z = 0;

        this.shuttleImage = new Image();
        this.shuttleImage.src = "resources/images/shuttle.png";

        this.ouchSound = new Audio("resources/sound/ouch.ogg");

        this.shotCooldown = 0;
        this.invulnerabilityCooldown = 0;

        this.health = 5;
        this.enabled = true;
    }

    update() {
        if (!this.enabled) {
            return;
        }

        this.shotCooldown -= 1;
        this.invulnerabilityCooldown -= 1;

        // Left
        if (globalContext.isPressed(37)) { this.x -= settings.speed; }
        // Right
        if (globalContext.isPressed(39)) { this.x += settings.speed; }
        // Down
        if (globalContext.isPressed(40)) { this.y += settings.speed; }
        // Up
        if (globalContext.isPressed(38)) { this.y -= settings.speed; }

        if (this.x < 0) {
            this.x = 0;
        }

        if (this.x + 100 > settings.width) {
            this.x = settings.width - 100;
        }

        if (this.y < 0) {
            this.y = 0;
        }

        if (this.y + 100 > settings.height) {
            this.y = settings.height - 100;
        }


        if (globalContext.isPressed(32) && this.shotCooldown <= 0) { 
            this.shotCooldown = 10;
            
            drawables.push(new Projectile(this.x + 100, this.y + 45))
        }

        hearts.amount = this.health;
    }

    ouch() {
        if (this.invulnerabilityCooldown > 0) {
            return;
        }

        this.ouchSound.play();
        this.health--;
        this.invulnerabilityCooldown = 120;

        if (this.health < 0) {
            this.enabled = false;
        }
    }

    onCollide(other) {
        if (!other.enabled) {
            return;
        }

        if (other instanceof Enemy) {
            other.enabled = false;

            this.ouch();
        }

        if (other instanceof Healthpack){
            other.enabled = false;

            this.health++;
        }
    }

    draw() {
        if (!this.enabled) {
            return;
        }

        if (this.invulnerabilityCooldown > 0) {
            context.globalAlpha = 0.5;
        }
        context.drawImage(this.shuttleImage, this.x, this.y, 100, 100);
        context.globalAlpha = 1;
    }

    getBoundingRect() {
        return new BoundingRect(this.x, this.y, 100, 100);
    }
}
