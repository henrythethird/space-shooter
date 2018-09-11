class SingleShot {
    constructor(parent) {
        this.parent = parent;
        this.shotCooldown = 0;
    }

    update() {
        this.shotCooldown--;
    }

    shoot() {
        if (this.shotCooldown > 0) return;

        this.shotCooldown = settings.weapon.single.cooldown;

        spawner.spawn(
            ENTITY_PROJECTILE, 
            this.parent.x + this.parent.w + 1, 
            this.parent.y + this.parent.h / 2
        );
    }
}