class TitleScreen {
    constructor() {
        this.audio = new Audio("resources/music/title.ogg");
        this.audio.loop = true;
    }

    start() {
        drawables = [];

        this.audio.play();
    }

    run() {
        globalContext.clear();

        context.font = "50px 'Press Start 2P'";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.fillText("Throbbleshotter!", settings.width / 2, settings.height / 2);

        context.font = "30px 'Press Start 2P'";
        context.fillStyle = "gold";
        context.fillText("Press [Enter] to Start", settings.width / 2, settings.height / 2 + 100);

        if (globalContext.isPressed(13)) {
            screens.transition(screens.main);
        }
    }

    stop() {
        this.audio.pause();
    }
}
