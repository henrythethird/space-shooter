const ENTITY_PROJECTILE = "projectile";
const ENTITY_ENEMY = "enemy";
const ENTITY_PLAYER = "player";
const ENTITY_ASTEROID = "asteroid";
const ENTITY_HEALTHPACK = "healthpack";
const ENTITY_POWERUP = "powerup";

const spawner = {
    reset() {
        drawables = [];
    },
    spawn(name, x, y) {
        var entity = null;

        switch (name) {
        case ENTITY_PROJECTILE:
            entity = new Projectile(x, y);
            break;
        case ENTITY_ENEMY:
            entity = new Enemy(x, y);
            break;
        case ENTITY_ASTEROID:
            entity = new Asteroid(x, y);
            break;
        case ENTITY_PLAYER:
            entity = new Player(x, y);
            break;
        case ENTITY_HEALTHPACK:
            entity = new Upgrade(x, y, resources.getImage(IMAGE_HEALTHPACK), (powerup, player) => {
                player.health++;
                powerup.enabled = false;
            });
            break;
        case ENTITY_POWERUP:
            entity = new Upgrade(x, y, resources.getImage(IMAGE_POWERUP), (powerup, player) => {
                player.weapon = new DoubleShot(player);
                powerup.enabled = false;
            })
        }

        if (!entity) return;

        drawables.push(entity);
    }
}
