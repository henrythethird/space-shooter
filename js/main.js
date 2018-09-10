/**
 * Main.js
 */

var drawables = [];
var hearts;

const screens = {
    gameover: new GameOverScreen(),
    title: new TitleScreen(),
    main: new MainScreen(),

    current: null,

    transition(other) {
        if (screens.current) {
            screens.current.stop();
        }

        screens.current = other;
        screens.current.start();
    }
}

const audio = new Audio;
audio.loop = true;
audio.volume = 0.3;

/**
 * Initialize the elements
 */
function init() {
    setInterval(draw, settings.refreshRate);
}

/**
 * Draw stuff on the screen
 */
function draw() {
    if (screens.current) {
        screens.current.run();
    } else {
        screens.transition(screens.title);
    }

    if (globalContext.isPressed(27)) {
        screens.transition(screens.title);
    }
}

init();
