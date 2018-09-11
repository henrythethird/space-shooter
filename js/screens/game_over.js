class GameOverScreen extends Screen {
    constructor() {
        super(resources.getAudio(MUSIC_GAME_OVER));
    }

    run() {
        super.run();

        drawer.drawText(
            "Game Over, Bro!", settings.width / 2, settings.height / 2,
            FONT_GAMEARCADE, "50px"
        );

        drawer.drawText(
            "Score: " + hud.score, settings.width / 2, settings.height / 2 + 100
        );
        
        drawer.drawText(
            "Press [ESC] to reset", settings.width / 2, settings.height / 2 + 150,
            FONT_GAMEARCADE, "30px", "gold"
        );
    }
}
