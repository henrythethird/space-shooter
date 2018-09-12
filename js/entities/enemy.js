class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.z = -1;

        this.w = 75;
        this.h = 50;

        this.score = settings.enemy.score;

        this.enabled = true;
        this.enableDrops = true;

        const index = Math.floor(Math.random() * 5) + 1;

        this.image = resources.getImage("enemy" + index);
        this.explosionSound = resources.getAudio(SOUND_EXPLODE);

        this.health = settings.enemy.health;
        this.weapon = null;

        this.evil = true;

        if (Math.random() > .5) {
            this.weaponMount = new WeaponMount(0, 0, -1);
            this.weapon = new SingleShot(this, this.weaponMount);
            this.weapon.cooldown = 50;
        }
    }

    update() {
        this.x -= settings.enemy.speed;

        if (this.weapon) {
            this.updateWeaponMount();
            this.weapon.update();
            this.weapon.shoot();
        }
    }

    kill() {
        hud.score += this.score;
        this.enabled = false;
        this.explosionSound.play();

        animations.create(
            ANIMATION_EXPLOSION, this.x, this.y, 
            (anim) => {
                anim.x -= settings.enemy.speed;
            }
        );
    }

    damage(hp) {
        this.health -= hp;

        if (this.health <= 0) {
            this.kill();
            this.drop();
        }
    }

    drop() {
        if (!this.enableDrops) return;

        if (Math.random() < .05) {
            spawner.spawn(ENTITY_HEALTHPACK, this.x + 40, this.y + 40);
            return;
        }

        if (Math.random() < .025) {
            spawner.spawn(ENTITY_POWERUP, this.x + 40, this.y + 40);
            return;
        }
    }

    onCollide() {}

    draw() {
        if (!this.enabled) {
            return;
        }

        context.drawImage(
            this.image, this.x, this.y, this.w, this.h
        );
    }

    getBoundingRect() {
        return new BoundingRect(this.x, this.y, this.w, this.h);
    }

    updateWeaponMount() {
        this.weaponMount.x = this.x;
        this.weaponMount.y = this.y + this.h / 2;
    }
}
