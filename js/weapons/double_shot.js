class DoubleShot {
    constructor(parent, mount) {
        this.parent = parent;
        this.shotCooldown = 0;
        this.mount = mount;
    }

    update() {
        this.shotCooldown--;
    }

    shoot() {
        if (this.shotCooldown > 0) return;

        this.shotCooldown = settings.weapon.double.cooldown;
        const mount = this.mount;

        var p1 = spawner.spawn(ENTITY_PROJECTILE, mount.x, mount.y - 5);
        var p2 = spawner.spawn(ENTITY_PROJECTILE, mount.x, mount.y + 5);

        p1.direction = mount.direction;
        p1.evil = this.parent.evil;
        
        p2.direction = mount.direction;
        p2.evil = this.parent.evil;
    }
}