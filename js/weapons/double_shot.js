class DoubleShot {
    constructor(parent) {
        this.parent = parent;
        this.shotCooldown = 0;
    }

    update() {
        this.shotCooldown--;
    }

    shoot() {
        if (this.shotCooldown > 0) return;

        this.shotCooldown = settings.weapon.double.cooldown;

        spawner.spawn(
            ENTITY_PROJECTILE, 
            this.parent.x + this.parent.w, 
            this.parent.y + this.parent.h / 2 - 5
        );

        spawner.spawn(
            ENTITY_PROJECTILE, 
            this.parent.x + this.parent.w, 
            this.parent.y + this.parent.h / 2 + 5
        );
    }
}