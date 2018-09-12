class SingleShot {
    constructor(parent, mount) {
        this.parent = parent;
        this.shotCooldown = 0;
        this.cooldown = settings.weapon.single.cooldown;
        this.mount = mount;
    }

    update() {
        this.shotCooldown--;
    }

    shoot() {
        if (this.shotCooldown > 0) return;

        this.shotCooldown = this.cooldown;
        const mount = this.mount;

        const entity = spawner.spawn(ENTITY_PROJECTILE, mount.x, mount.y);
        entity.direction = mount.direction;
        entity.evil = this.parent.evil;
    }
}