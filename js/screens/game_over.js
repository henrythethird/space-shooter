class GameOverScreen {
    constructor() {
        this.audio = new Audio("resources/music/game_over.mp3");
        this.audio.loop = true;
    }

    start() {
        this.audio.play();
    }

    run() {
        globalContext.clear();

        context.font = "50px 'Press Start 2P'";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.fillText("Game Over, Bro!", settings.width / 2, settings.height / 2);

        context.font = "30px 'Press Start 2P'";
        context.fillText("Score: " + hearts.score, settings.width / 2, settings.height / 2 + 100);
    }

    stop() {
        this.audio.pause();
    }
}
