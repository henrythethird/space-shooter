/**
 * Main.js
 */

/**
 * Global variables
 */
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const settings = {
    width: canvas.width,
    height: canvas.height,
    refreshRate: 16/* ms */,
    speed: 4,
    projectileSpeed: 10,
};

var arr = [];
var globalContext = {
    keys: {},
    keydown(event) { /* console.log(event); */globalContext.keys[String(event.keyCode)] = true },
    keyup(event) { globalContext.keys[String(event.keyCode)] = false },
    isPressed(keyCode) { return globalContext.keys[String(keyCode)] }
};
var drawables = [];
var hearts;

class BoundingRect {
    constructor(posX, posY, width, height) {
        this.x = posX;
        this.y = posY;
        this.width = width;
        this.height = height;
    }

    collides(other) {
        return !(other.x > (this.x + this.width) || 
            (other.x + other.width) < this.x || 
            other.y > (this.y + this.height) ||
            (other.y + other.height) < this.y);
    }
}

class Hearts {
    constructor(posX, posY, amount) {
        this.x = posX;
        this.y = posY;
        this.amount = amount;

        this.heartImage = new Image();
        this.heartImage.src = "resources/images/heart.png";
    }

    onCollide() {}

    draw() {
        for (var i = 0; i < this.amount; i++) {
            context.drawImage(this.heartImage, this.x + i * 30, this.y, 20, 15);
        }
    }
}

class Enemy {
    constructor(posX, posY) {
        this.x = posX;
        this.y = posY;

        this.enabled = true;

        const index = Math.floor(Math.random() * 5) + 1;

        this.spaceshipImage = new Image();
        this.spaceshipImage.src = "resources/images/enemy" + index + ".png";

        this.health = 2;
    }

    update() {
        this.x -= settings.speed;
    }

    onCollide(other) {
        if (other instanceof Projectile) {
            other.enabled = false;
            this.health--;

            if (this.health <= 0) {
                this.enabled = false;
            }
        }
    }

    draw() {
        if (!this.enabled) {
            return;
        }

        context.drawImage(this.spaceshipImage, this.x, this.y, 75, 50);
    }

    getBoundingRect() {
        return new BoundingRect(this.x, this.y, 75, 50);
    }
}

class Projectile {
    constructor(posX, posY) {
        this.x = posX;
        this.y = posY;
        this.enabled = true;

        this.projectileImage = new Image();
        this.projectileImage.src = "resources/images/projectile.png";

        this.soundEffect = new Audio("resources/sound/projectile.ogg");
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

class Player {
    constructor(posX, posY) {
        this.x = posX;
        this.y = posY;

        this.shuttleImage = new Image();
        this.shuttleImage.src = "resources/images/shuttle.png";

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

    onCollide(other) {
        if (!other.enabled) {
            return;
        }

        if (other instanceof Enemy) {
            other.enabled = false;
            
            if (this.invulnerabilityCooldown < 0) {
                this.health--;
                this.invulnerabilityCooldown = 120;
            }

            if (this.health < 0) {
                this.enabled = false;
            }
        }
    }

    draw() {
        if (!this.enabled) {
            return;
        }

        context.drawImage(this.shuttleImage, this.x, this.y, 100, 100);
    }

    getBoundingRect() {
        return new BoundingRect(this.x, this.y, 100, 100);
    }
}

/**
 * Initialize the elements
 */
function init() {
    setInterval(draw, settings.refreshRate);

    window.addEventListener('keydown', globalContext.keydown);
    window.addEventListener('keyup', globalContext.keyup);

    drawables.push(new Player(100, settings.height / 2));
    hearts = new Hearts(50, settings.height - 50, 5);

    const backgroundAudio = new Audio("resources/music/background.mp3");
    backgroundAudio.loop = true;
    backgroundAudio.volume = 0.1;
    setTimeout(function() {
        backgroundAudio.play();
    }, 50);
}

/**
 * Draw stuff on the screen
 */
function draw() {
    drawables.forEach((drawable) => {
        drawable.update();
    });

    drawables.forEach((c1) => {
        drawables.forEach((c2) => {
            if (!c1.enabled || !c2.enabled) return;

            if (c1.getBoundingRect().collides(c2.getBoundingRect())) {
                c1.onCollide(c2);
                c2.onCollide(c1);
            }
        })
    })

    context.clearRect(0, 0, settings.width, settings.height);

    if (Math.random() > .99) {
        drawables.push(new Enemy(settings.width, Math.random() * (settings.height - 100)  + 50));
    }

    drawables.forEach((drawable) => {
        drawable.draw();
    });

    hearts.draw();
    
    if (hearts.amount <= 0) {
        alert("game over bro");
        window.location.reload();

        drawables = [];
    }
}

init();
