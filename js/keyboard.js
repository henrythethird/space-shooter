const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;

const KEY_SPACE = 32;
const KEY_ESC = 27;

const keyboard = {
    _keys: {},
    keydown(event) { keyboard._keys[String(event.keyCode)] = true },
    keyup(event) { keyboard._keys[String(event.keyCode)] = false },
    isPressed(keyCode) { return keyboard._keys[String(keyCode)] },
};

window.addEventListener('keydown', keyboard.keydown);
window.addEventListener('keyup', keyboard.keyup);
