class Boss extends Enemy {
    constructor(x, y) {
        super(x, y);

        this.w = 300;
        this.h = 250;

        this.health = 200;
        this.score = 2000;
        this.yVel = 3;

        this.weapon = new DoubleShot(this, true);

        this.image = resources.getImage(IMAGE_BOSS)
    }

    update() {
        if ((this.y + this.h) > settings.height * .9) {
            this.yVel = -3;
        }

        if (this.y < settings.height * .1) {
            this.yVel = 3;
        }

        if (this.x > settings.width * .6) {
            this.x -= 2;
        }

        this.y += this.yVel;

        this.weapon.update();
        this.weapon.shoot();
    }

    getWeaponMount() {
        return new WeaponMount(this.x - 1, this.y + this.h / 2, -1);
    }
}