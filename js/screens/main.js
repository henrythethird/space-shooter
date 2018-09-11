class MainScreen extends Screen {
    constructor() {
        super(resources.getAudio(MUSIC_BACKGROUND))
        this.boss = null;
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

        // Reset the boss if it got killed
        this.boss = null;

        if (Math.random() > .98) {
            spawner.spawn(ENTITY_ENEMY, settings.width, Math.random() * (settings.height - 100)  + 50);
            return;
        }

        if (Math.random() > .999) {
            this.boss = spawner.spawn(ENTITY_BOSS, settings.width, 100);
        }
    }

    /**
     * Filters entities that are disabled or have gone off screen
     * Afterwards they get sorted according to their Z-Coordinates
     */
    updateDrawables() {
        drawables = drawables.filter((d) => {
            if (!d.enabled) {
                return false;
            }

            if (d.x < -settings.width || d.x > settings.width ||
                d.y < - settings.height || d.y > settings.height)
            {
                return false;
            }

            return true;
        });

        drawables.sort((dr1, dr2) => dr1.z - dr2.z);
    }

    updateCollisions() {
        drawables.forEach((c1) => {
            drawables.forEach((c2) => {
                if (c1 == c2) return;
                if (!c1.getBoundingRect || !c2.getBoundingRect) return;
                if (!c1.enabled || !c2.enabled) return;

                if (c1.getBoundingRect().collides(c2.getBoundingRect())) {
                    c1.onCollide(c2);
                    c2.onCollide(c1);
                }
            })
        });
    }

    run() {
        super.run();

        hud.draw();

        if (hud.amount <= 0) {
            const audio = resources.getAudio(SOUND_GAME_OVER);
            audio.play();

            screens.transition(screens.gameover);
        }
    }
}
