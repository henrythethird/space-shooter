class TitleScreen {
    constructor() {
        this.audio = resources.getAudio(MUSIC_TITLE);
        this.audio.loop = true;
    }

    start() {
        drawables = [];

        this.audio.play();
    }

    run() {
        drawer.clear();

        drawer.drawText(
            "Throbbleshotter!", settings.width / 2, settings.height / 2,
            FONT_GAMEARCADE, "50px"
        );

        drawer.drawText(
            "Press [Space] to Start", settings.width / 2, settings.height / 2 + 100,
            FONT_GAMEARCADE, "30px", "gold"
        );

        if (keyboard.isPressed(KEY_SPACE)) {
            screens.transition(screens.main);
        }
    }

    stop() {
        this.audio.pause();
    }
}
