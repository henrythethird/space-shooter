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
    state: "title_start",
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


class TitleScreen {
    constructor() {
    }

    draw() {
        context.font = "50px 'Press Start 2P'";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.fillText("Throbbleshotter!", settings.width / 2, settings.height / 2);

        context.font = "30px 'Press Start 2P'";
        context.fillText("Press [Enter] to Start :-)", settings.width / 2, settings.height / 2 + 100);
    }
}

class GameOverScreen {
    constructor() {
    }

    draw() {
        context.font = "50px 'Press Start 2P'";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.fillText("Game Over, Bro!", settings.width / 2, settings.height / 2);

        context.font = "30px 'Press Start 2P'";
        context.fillText("Score: " + hearts.score, settings.width / 2, settings.height / 2 + 100);

    }
}

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

class Enemy {
    constructor(posX, posY) {
        this.x = posX;
        this.y = posY;
        this.z = 0;

        this.enabled = true;

        const index = Math.floor(Math.random() * 5) + 1;

        this.spaceshipImage = new Image();
        this.spaceshipImage.src = "resources/images/enemy" + index + ".png";

        this.explosionSound = new Audio("resources/sound/explode.ogg");

        this.health = 2;
    }

    update() {
        this.x -= settings.speed;
    }

    kill() {
        hearts.score += 10;
        this.enabled = false;
        this.explosionSound.play();
    }

    onCollide(other) {
        if (other instanceof Projectile) {
            other.enabled = false;
            this.health--;

            if (this.health <= 0) {
                this.kill();
            }
        }

        if (other instanceof Player) {
            this.kill();
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
        this.z = 0;
        this.enabled = true;

        this.projectileImage = new Image();
        this.projectileImage.src = "resources/images/projectile.png";

        this.soundEffect = new Audio("resources/sound/projectile.ogg");
        this.soundEffect.volume = 0.3;
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

const screens = {
    gameover: new GameOverScreen(),
    title: new TitleScreen()
}

const audio = new Audio;
audio.loop = true;
audio.volume = 0.3;

/**
 * Initialize the elements
 */
function init() {
    setInterval(draw, settings.refreshRate);

    window.addEventListener('keydown', globalContext.keydown);
    window.addEventListener('keyup', globalContext.keyup);
}

/**
 * Draw stuff on the screen
 */
function draw() {
    if (globalContext.state == "running") {
        drawDrawables();
    } else {
        context.clearRect(0, 0, settings.width, settings.height);
    }

    if (globalContext.isPressed(27)) {
        globalContext.state = "title_start";
    }

    if (globalContext.state == "title_start") {
        audio.pause();
        audio.src = "resources/music/title.ogg";
        setTimeout(() => { audio.play() }, 10);

        drawables = [];

        globalContext.state = "title";
    }

    if (globalContext.state == "title") {
        screens.title.draw();

        if (globalContext.isPressed(13)) {
            globalContext.state = "starting";
        }
    }

    if (globalContext.state == "starting") {
        drawables = [];
        drawables.push(new Player(100, settings.height / 2));
        hearts = new HUD(50, settings.height - 50, 5);

        globalContext.state = "running";

        audio.pause();
        audio.src = "resources/music/background.mp3";
        audio.play();
    }

    if (globalContext.state == "gameover_start") {
        audio.pause();
        audio.src = "resources/music/game_over.mp3";
        audio.play();

        globalContext.state = "gameover";
    }

    if (globalContext.state == "gameover") {
        screens.gameover.draw();

        if (globalContext.isPressed(13)) {
            globalContext.state = "title_start";
        }
    }
}

function drawDrawables() {
    drawables = drawables.filter((d) => {
        if (!d.enabled) {
            return false;
        }

        if (d.x < -settings.width || d.x > settings.width ||
            d.y < - settings.height || d.y > settings.height)
        {
            return false;
        }

        return true;
    });
    drawables.sort((dr1, dr2) => dr1.z - dr2.z);

    drawables.forEach((drawable) => {
        drawable.update();
    });

    drawables.forEach((c1) => {
        drawables.forEach((c2) => {
            if (!c1.getBoundingRect || !c2.getBoundingRect) return;
            if (!c1.enabled || !c2.enabled) return;

            if (c1.getBoundingRect().collides(c2.getBoundingRect())) {
                c1.onCollide(c2);
                c2.onCollide(c1);
            }
        })
    })

    context.clearRect(0, 0, settings.width, settings.height);

    drawables.forEach((drawable) => {
        drawable.draw();
    });


    if (Math.random() > .99) {
        drawables.push(new Enemy(settings.width, Math.random() * (settings.height - 100)  + 50));
    }

    if (Math.random() > 0.9) {
        drawables.push(new Asteroid(settings.width, Math.random() * (settings.height - 100)  + 50));
    }

    hearts.draw();

    if (hearts.amount <= 0) {
        const audio = new Audio("resources/sound/game_over.ogg");
        audio.play();
        globalContext.state = "gameover_start";
    }
}

init();
