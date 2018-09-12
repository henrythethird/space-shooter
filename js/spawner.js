const ENTITY_PROJECTILE = "projectile";
const ENTITY_ENEMY = "enemy";
const ENTITY_PLAYER = "player";
const ENTITY_ASTEROID = "asteroid";
const ENTITY_HEALTHPACK = "healthpack";
const ENTITY_POWERUP = "powerup";
const ENTITY_STAR = "star";
const ENTITY_BOSS = "boss";

const spawner = {
    reset() {
        drawables = drawables.filter((d) => {
            if (d instanceof Asteroid) return true;
            if (d instanceof Star) return true;

            return false;
        })
    },
    spawn(name, x, y) {
        var entity = null;

        switch (name) {
        // Environment
        case ENTITY_ASTEROID:
            entity = new Asteroid(x, y);
            break;
        case ENTITY_STAR:
            entity = new Star(x, y);
            break;

        // Weapons
        case ENTITY_PROJECTILE:
            entity = new Projectile(x, y);
            break;

        // Characters
        case ENTITY_ENEMY:
            entity = new Enemy(x, y);
            break;
        case ENTITY_BOSS:
            entity = new Boss(x, y);
            break;
        case ENTITY_PLAYER:
            entity = new Player(x, y);
            break;

        // Powerups
        case ENTITY_HEALTHPACK:
            entity = new Upgrade(x, y, resources.getImage(IMAGE_HEALTHPACK), (powerup, player) => {
                player.health++;
                powerup.enabled = false;
            });
            break;
        case ENTITY_POWERUP:
            entity = new Upgrade(x, y, resources.getImage(IMAGE_POWERUP), (powerup, player) => {
                player.weapon = new DoubleShot(player, player.weaponMount);
                powerup.enabled = false;
            })
        }

        if (!entity) return;

        drawables.push(entity);

        return entity;
    }
}
