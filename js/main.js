/**
 * Main.js
 */

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
var x = 0;
var y = 0;

function draw() {
    context.clearRect(0, 0, 800, 600);

    context.fillRect(x, y, 200, 200);
    x += 1;
    y += 0.5;
}

setInterval(draw, 20/* ms */);
