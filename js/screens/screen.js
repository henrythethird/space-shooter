class Screen {
    constructor(audio) {
        this.audio = audio;
        this.audio.loop = true;
    }

    start() {
        spawner.reset();
        this.audio.play();
    }

    spawn() {
        if (Math.random() > .95) {
            spawner.spawn(ENTITY_ASTEROID, settings.width, Math.random() * (settings.height - 100)  + 50);
        }

        if (Math.random() > .8) {
            spawner.spawn(ENTITY_STAR, settings.width, Math.random() * settings.height);
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
        this.updateDrawables();
        this.updateCollisions();

        drawables.forEach((drawable) => {
            drawable.update();
        });

        drawer.clear();

        drawables.forEach((drawable) => {
            drawable.draw();
        });

        this.spawn();
    }

    stop() {
        this.audio.pause();
    }
}
