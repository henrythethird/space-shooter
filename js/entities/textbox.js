class Textbox {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.textboxImage = resources.getImage(IMAGE_TEXTBOX);
        this.portraitImage = resources.getImage(IMAGE_PORTRAIT);
    }
    draw(){
        context.drawImage(
            this.portraitImage, this.x, this.y, 150, 150
        );
            
        context.drawImage(
            this.textboxImage, this.x + 180, this.y, 450, 200
        );
    };
}
