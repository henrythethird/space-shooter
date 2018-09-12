class Boss extends Enemy {
    constructor(x, y) {
        super(x, y);

        this.w = 300;
        this.h = 250;

        this.vel = {x: 0, y: -3};

        this.health = 200;
        this.score = 2000;

        this.weaponMounts = {
            top: new WeaponMount(0, 0, -1),
            bottom: new WeaponMount(0, 0, -1),
            center: new WeaponMount(0, 0, -1)
        }

        this.weapons = [
            new SingleShot(this, this.weaponMounts.top),
            new DoubleShot(this, this.weaponMounts.center),
            new SingleShot(this, this.weaponMounts.bottom)
        ];

        this.image = resources.getImage(IMAGE_BOSS)

        this.specialAttack = false;
    }

    update() {
        this.updateWeaponMount();
        this.weapons.forEach((weapon) => {
            weapon.update();
        })
        
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

                if (Math.random() > 0.5) {
                    this.specialAttack = true;
                }
            }

            if (this.x < settings.width * .6) {
                this.vel.x = 2;
            }

            if (this.vel.y < 0) {
                this.weapons.forEach((weapon) => {
                    weapon.shoot();
                })
            }
        }

        this.y += this.vel.y;
        this.x += this.vel.x;
    }

    updateWeaponMount() {
        this.weaponMounts.top.x = this.x - 1;
        this.weaponMounts.top.y = this.y + this.h / 5;

        this.weaponMounts.center.x = this.x - 1;
        this.weaponMounts.center.y = this.y + this.h / 2;

        this.weaponMounts.bottom.x = this.x - 1;
        this.weaponMounts.bottom.y = this.y + 4 * this.h / 5;
    }
}