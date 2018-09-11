class DoubleShot {
    constructor(parent, evil = false) {
        this.parent = parent;
        this.shotCooldown = 0;
        this.evil = evil;
    }

    update() {
        this.shotCooldown--;
    }

    shoot() {
        if (this.shotCooldown > 0) return;

        this.shotCooldown = settings.weapon.double.cooldown;
        const mount = this.parent.getWeaponMount();

        var p1 = spawner.spawn(ENTITY_PROJECTILE, mount.x, mount.y - 5);
        var p2 = spawner.spawn(ENTITY_PROJECTILE, mount.x, mount.y + 5);

        p1.direction = mount.direction;
        p1.evil = this.evil;
        
        p2.direction = mount.direction;
        p2.evil = this.evil;
    }
}