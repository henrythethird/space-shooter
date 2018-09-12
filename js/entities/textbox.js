class Textbox {
    constructor(x, y, text) {
        this.x = x;
        this.y = y;

        this.text = [
            { switch: false, text: "Nah, dude, didn't find my stash\nthis morning. Still looking though.\nThanks for asking" },
            { switch: true, text: "Hello stranger, you stoned\n, man?" },
        ];
        this.textPointer = 0;

        this.enabled = true;

        this.textboxImage = resources.getImage(IMAGE_TEXTBOX);
        this.portraitImage = resources.getImage(IMAGE_PORTRAIT);
        this.astronautImage = resources.getImage(IMAGE_ASTRONAUT);
    }

    next() {
        this.textPointer++;

        if (this.textPointer >= this.text.length) {
            this.enabled = false;
        };
    }

    draw() {
        if (!this.enabled) {
            return;
        }

        const textObject = this.text[this.textPointer];

        context.drawImage(
            this.textboxImage, this.x + 180, this.y, 630, 180
        );
        
        textObject.text
            .split('\n')
            .forEach((line, index) => {
                drawer.drawText(
                    line, this.x + 220, this.y + 60 + 25 * index, 
                    FONT_GAMEARCADE, "16px", "white", "left"
                );
            });
        
        drawer.drawText(
            "Press [Enter]", this.x + 530, this.y + 165, 
            FONT_GAMEARCADE, "16px", "white", "left"
        );

        if (!textObject.switch) {
            context.drawImage(
                this.astronautImage, this.x, this.y, 130, 130
            );
        } else {
            context.drawImage(
                this.portraitImage, this.x, this.y, 150, 130
            );
        }
    };
}
