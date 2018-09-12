class MainScreen extends Screen {
    constructor() {
        super(resources.getAudio(MUSIC_BACKGROUND));

        this.boss = null;
        this.bossMusic = resources.getAudio(MUSIC_BOSS_BATTLE);

        this.paused = false;
        this.textbox = new Textbox(300, 400);
    
    }

    start() {
        super.start();

        spawner.spawn(ENTITY_PLAYER, 100, settings.height / 2);
        hud = new HUD(50, settings.height - 50, 5);
    }

    spawn() {
        super.spawn();

        // If there is alread a boss spawned, stop spawning minions
        if (this.boss && this.boss.enabled) {
            return;
        }

        if (this.boss) {
            // Reset the boss if it got killed
            this.bossMusic.pause();
            this.boss = null;
            this.audio.play();
        }

        if (hud.score == 500) {
            this.boss = spawner.spawn(ENTITY_BOSS, settings.width, 100);
            this.bossMusic.play();
            this.audio.pause();
        }

        if (Math.random() > .985) {
            spawner.spawn(ENTITY_ENEMY, settings.width, Math.random() * (settings.height - 100)  + 50);
            return;
        }
    }

    run() {
        if (this.paused) {
            if (keyboard.isPressed(KEY_SPACE)) {
                this.paused = false;
            }

            return;
        }

        super.run();

        hud.draw();

        if (hud.amount <= 0) {
            const audio = resources.getAudio(SOUND_GAME_OVER);
            audio.play();

            screens.transition(screens.gameover);
        }

        if (keyboard.isPressed(KEY_ESC)) {
            drawer.drawText(
                "Paused", settings.width / 2, settings.height / 2,
                FONT_GAMEARCADE, "50px"
            );

            drawer.drawText(
                "Press [Space] to Continue", settings.width / 2, settings.height / 2 + 100,
                FONT_GAMEARCADE, "30px", "gold"
            );

            this.paused = true;
        }
        this.textbox.draw();
    }

    stop() {
        super.stop();
        
        this.boss = null;
        this.bossMusic.pause();
    }
}
