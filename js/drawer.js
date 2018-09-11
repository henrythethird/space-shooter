const FONT_GAMEARCADE = "Press Start 2P";
const FONT_SCORE = "Bungee Shade";

const drawer = {
    clear() { 
        context.clearRect(0, 0, settings.width, settings.height); 
    },
    drawText(text, x, y, font = FONT_GAMEARCADE, size = "30px", color = "white", align = "center") {
        context.font = size + "'" + font + "'";
        context.fillStyle = color;
        context.textAlign = align;
        context.fillText(text, x, y);
    }
};
