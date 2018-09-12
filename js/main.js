/**
 * Main.js
 */

var drawables = [];
var hud;

const screens = {
    gameover: new GameOverScreen(),
    title: new TitleScreen(),
    main: new MainScreen(),

    current: null,

    transition(newScreen) {
        if (screens.current) {
            screens.current.stop();
        }

        screens.current = newScreen;
        screens.current.start();
    }
}

const audio = new Audio;
audio.loop = true;
audio.volume = settings.volume;

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
        return
    }

    // If there's no active screen
    // Switch to the title screen
    screens.transition(screens.title);
}

init();
