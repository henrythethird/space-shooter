class TitleScreen extends Screen {
    constructor() {
        super(resources.getAudio(MUSIC_TITLE));
    }

    run() {
        super.run();

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
}
