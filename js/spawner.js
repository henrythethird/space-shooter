const ENTITY_PROJECTILE = "projectile";
const ENTITY_ENEMY = "enemy";
const ENTITY_PLAYER = "player";
const ENTITY_ASTEROID = "asteroid";

const spawner = {
    reset() {
        drawables = [];
    },
    spawn(name, ...args) {
        var entity = null;

        switch (name) {
        case ENTITY_PROJECTILE:
            entity = new Projectile(...args);
            break;
        case ENTITY_ENEMY:
            entity = new Enemy(...args);
            break;
        case ENTITY_ASTEROID:
            entity = new Asteroid(...args);
            break;
        case ENTITY_PLAYER:
            entity = new Player(...args);
            break;
        }

        if (!entity) return;

        drawables.push(entity);
    }
}
