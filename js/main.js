/**
 * Main.js
 */

/**
 * Global variables
 */
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const settings = {
    width: 800,
    height: 600,
    refreshRate: 16/* ms */,
    speed: 2,
};

var arr = [];
var globalContext = {
    keys: {},
    keydown(event) { /* console.log(event); */globalContext.keys[String(event.keyCode)] = true },
    keyup(event) { globalContext.keys[String(event.keyCode)] = false },
    isPressed(keyCode) { return globalContext.keys[String(keyCode)] }
};

var x = 0;
var y = 0;

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
    context.clearRect(0, 0, settings.width, settings.height);

    // Left
    if (globalContext.isPressed(37)) { x -= settings.speed; }
    // Right
    if (globalContext.isPressed(39)) { x += settings.speed; }
    // Down
    if (globalContext.isPressed(40)) { y += settings.speed; }
    // Up
    if (globalContext.isPressed(38)) { y -= settings.speed; }

    context.fillStyle = '#ff00ff';
    context.fillRect(x, y, 200, 200);
}

init();
