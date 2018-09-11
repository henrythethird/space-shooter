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

        const mount = this.parent.getWeaponMount();

        spawner
            .spawn(ENTITY_PROJECTILE, mount.x, mount.y)
            .direction = mount.direction;
    }
}