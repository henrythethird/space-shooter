const IMAGE_ASTEROIDS = "asteroids"
const IMAGE_ENEMY1 = "enemy1";
const IMAGE_ENEMY2 = "enemy2";
const IMAGE_ENEMY3 = "enemy3";
const IMAGE_ENEMY4 = "enemy4";
const IMAGE_ENEMY5 = "enemy5";
const IMAGE_EXPLOSION = "explosion";
const IMAGE_HEALTHPACK = "healthpack";
const IMAGE_POWERUP = "powerup";
const IMAGE_HEART = "heart";
const IMAGE_PROJECTILE = "projectile";
const IMAGE_SHUTTLE = "shuttle";
const IMAGE_BOSS = "boss";
const IMAGE_TEXTBOX = "text_box";
const IMAGE_PORTRAIT ="portrait";
const IMAGE_ASTRONAUT = "astronaut";

const SOUND_EXPLODE = "explode.ogg";
const SOUND_GAME_OVER = "game_over.ogg";
const SOUND_OUCH = "ouch.ogg";
const SOUND_PROJECTILE = "projectile.ogg";
const SOUND_POWERUP = "powerup.mp3";

const MUSIC_BACKGROUND = "background.mp3";
const MUSIC_GAME_OVER = "game_over.mp3";
const MUSIC_TITLE = "title.ogg";
const MUSIC_BOSS_BATTLE = "boss_battle.ogg";

const resources = {
    images: {},
    sound: {},
    initialize() {
        resources.initializeSound();
        resources.initializeImages();
    },
    initializeSound() {
        const sounds = [
            SOUND_EXPLODE, SOUND_GAME_OVER, 
            SOUND_OUCH, SOUND_PROJECTILE,
            SOUND_POWERUP,
        ];

        sounds.forEach((sound) => {
            resources.sound[sound] = new Audio("resources/sound/" + sound);
        })

        const music = [
            MUSIC_BACKGROUND,
            MUSIC_GAME_OVER,
            MUSIC_TITLE,
            MUSIC_BOSS_BATTLE
        ];

        music.forEach((m) => {
            resources.sound[m] = new Audio("resources/music/" + m);
        })
    },
    initializeImages() {
        const images = [
            IMAGE_ENEMY1, IMAGE_ENEMY2, IMAGE_ENEMY3, 
            IMAGE_ENEMY4, IMAGE_ENEMY5,
            IMAGE_ASTEROIDS, IMAGE_EXPLOSION, 
            IMAGE_HEALTHPACK, IMAGE_HEART, 
            IMAGE_POWERUP, IMAGE_SHUTTLE,
            IMAGE_PROJECTILE, IMAGE_BOSS,
            IMAGE_TEXTBOX, IMAGE_PORTRAIT,
            IMAGE_ASTRONAUT
        ];

        images.forEach((image) => {
            var img = new Image;
            img.src = "resources/images/" + image + ".png";
            resources.images[image] = img;
        });
    },
    getImage(name) {
        return resources.images[name];
    },
    getAudio(name) {
        return resources.sound[name];
    },
    playSound(name, volume = 1) {
        const audio = resources.getAudio(name);

        if (!audio) return;

        audio.volume = volume;
        audio.play();
    }
};

resources.initialize();
