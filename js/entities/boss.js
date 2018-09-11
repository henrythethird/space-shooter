class Boss extends Enemy {
    constructor(x, y) {
        super(x, y);

        this.w = 300;
        this.h = 250;

        this.vel = {x: 0, y: -3};

        this.health = 200;
        this.score = 2000;

        this.weapon = new DoubleShot(this, true);

        this.image = resources.getImage(IMAGE_BOSS)

        this.specialAttack = false;
    }

    update() {
        this.weapon.update();
        
        if (this.specialAttack) {
            if (this.x > settings.width * .3) {
                this.vel.x = -15;
                this.vel.y = 0;
            } else {
                this.vel.y = -3;
                this.specialAttack = false;
            }
        } else {
            if ((this.y + this.h) > settings.height * .9) {
                this.vel.y = -3;
            }

            if (this.y < settings.height * .1) {
                this.vel.y = 3;
            }

            if (this.x > settings.width * .7) {
                this.vel.x = -2;

                if (Math.random() > 0.9) {
                    this.specialAttack = true;
                }
            }

            if (this.x < settings.width * .6) {
                this.vel.x = 2;
            }

            this.weapon.shoot();
        }

        this.y += this.vel.y;
        this.x += this.vel.x;
    }

    getWeaponMount() {
        return new WeaponMount(this.x - 1, this.y + this.h / 2, -1);
    }
}