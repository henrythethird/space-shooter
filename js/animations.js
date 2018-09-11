const ANIMATION_EXPLOSION = "explosion";

const animations = {
    create(name, x, y, cb) {
        switch (name) {
        case ANIMATION_EXPLOSION:
            drawables.push(new Animation(
                x, y, 100, 100,
                resources.getImage(IMAGE_EXPLOSION), 
                100, 100, 5, cb
            ));
        }
    }
};
