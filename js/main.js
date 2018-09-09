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
    speed: 2,
    projectileSpeed: 5,
};

var arr = [];
var globalContext = {
    keys: {},
    keydown(event) { /* console.log(event); */globalContext.keys[String(event.keyCode)] = true },
    keyup(event) { globalContext.keys[String(event.keyCode)] = false },
    isPressed(keyCode) { return globalContext.keys[String(keyCode)] }
};
var drawables = [];

class Enemy {
    constructor(posX, posY) {
        this.x = posX;
        this.y = posY;

        const index = Math.floor(Math.random() * 5) + 1;
        this.spaceshipImage = new Image();
        this.spaceshipImage.src = "resources/images/enemy" + index + ".png";
    }

    update() {
        this.x -= settings.speed / 2;
    }

    draw() {
        context.drawImage(this.spaceshipImage, this.x, this.y, 75, 50);
    }
}

class Projectile {
    constructor(posX, posY) {
        this.x = posX;
        this.y = posY;

        this.projectileImage = new Image();
        this.projectileImage.src = "resources/images/projectile.png";

        this.soundEffect = new Audio("resources/sound/projectile.ogg");
        this.soundEffect.play();
    }

    update() {
        this.x += settings.projectileSpeed;
    }

    draw() {
        context.drawImage(this.projectileImage, this.x, this.y, 20, 10);
    }
}

class Player {
    constructor(posX, posY) {
        this.x = posX;
        this.y = posY;

        this.shuttleImage = new Image();
        this.shuttleImage.src = "resources/images/shuttle.png";

        this.shotCooldown = 0;
    }

    update() {
        this.shotCooldown -= 1;

        // Left
        if (globalContext.isPressed(37)) { this.x -= settings.speed; }
        // Right
        if (globalContext.isPressed(39)) { this.x += settings.speed; }
        // Down
        if (globalContext.isPressed(40)) { this.y += settings.speed; }
        // Up
        if (globalContext.isPressed(38)) { this.y -= settings.speed; }


        if (globalContext.isPressed(32) && this.shotCooldown <= 0) { 
            this.shotCooldown = 10;
            
            drawables.push(new Projectile(this.x + 100, this.y + 45))
        }
    }

    draw() {
        context.drawImage(this.shuttleImage, this.x, this.y, 100, 100);
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

    context.clearRect(0, 0, settings.width, settings.height);

    if (Math.random() > .99) {
        drawables.push(new Enemy(settings.width, Math.random() * settings.height));
    }

    drawables.forEach((drawable) => {
        drawable.draw();
    });
}

init();
