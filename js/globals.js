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

const globalContext = {
    state: "title_start",
    keys: {},
    keydown(event) { /* console.log(event); */globalContext.keys[String(event.keyCode)] = true },
    keyup(event) { globalContext.keys[String(event.keyCode)] = false },
    isPressed(keyCode) { return globalContext.keys[String(keyCode)] },
    clear() { context.clearRect(0, 0, settings.width, settings.height); }
};

const animations = {
    create(name, x, y) {
        switch (name) {
        case "explosion":
            drawables.push(new Animation(
                x, y, 100, 100, 
                "resources/images/explosion.png", 
                100, 100, 5, (anim) => { anim.x -= settings.speed }
            ));
        }
    }
}

window.addEventListener('keydown', globalContext.keydown);
window.addEventListener('keyup', globalContext.keyup);

