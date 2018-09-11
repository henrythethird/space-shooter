class MainScreen {
    constructor() {
        this.audio = new Audio("resources/music/background.mp3");
        this.audio.loop = true;
    }

    start() {
        drawables = [];
        drawables.push(new Player(100, settings.height / 2));
        hearts = new HUD(50, settings.height - 50, 5);

        this.audio.play();
    }

    run() {
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

        drawables.forEach((c1) => {
            drawables.forEach((c2) => {
                if (!c1.getBoundingRect || !c2.getBoundingRect) return;
                if (!c1.enabled || !c2.enabled) return;

                if (c1.getBoundingRect().collides(c2.getBoundingRect())) {
                    c1.onCollide(c2);
                    c2.onCollide(c1);
                }
            })
        });

        drawables.forEach((drawable) => {
            drawable.update();
        });

        globalContext.clear();

        drawables.forEach((drawable) => {
            drawable.draw();
        });


        if (Math.random() > .99) {
            drawables.push(new Enemy(settings.width, Math.random() * (settings.height - 100)  + 50));
        }

        if (Math.random() > 0.9) {
            drawables.push(new Asteroid(settings.width, Math.random() * (settings.height - 100)  + 50));
        }

        hearts.draw();

        if (hearts.amount <= 0) {
            const audio = new Audio("resources/sound/game_over.ogg");
            audio.play();

            screens.transition(screens.gameover);
        }
    }

    stop() {
        this.audio.pause();
    }
}
