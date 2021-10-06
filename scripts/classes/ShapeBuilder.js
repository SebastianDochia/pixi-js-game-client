class ShapeBuilder {
    #gr = new PIXI.Graphics();

    // Generates and returns a shape based on three optional parameters
    // The arguments that are omitted will be randomized
    constructShape(app, sideCount, color, specialType) {
        const useColor = color || this.#getRandomColor();
        const useSideCount = sideCount >= 3 && sideCount < 7 ? sideCount : this.#getRandomInt(3, 7);
        const renderer = app.renderer;
        let shape;

        this.#gr.beginFill(useColor);
        this.#gr.lineStyle(0);

        switch (specialType) {
            case SpecialTypes.CIRCLE:
                shape = this.#constructCircle(renderer);
                break;
            case SpecialTypes.ELLIPSE:
                shape = this.#constructEllipse(renderer);
                break;
            case SpecialTypes.RECT:
                shape = this.#constructRect(renderer);
                break;
            case SpecialTypes.POLYGON:
                shape = this.#constructPolygon(renderer, useSideCount);
                break;
            default:
                shape = this.#constructRandom(renderer);
                break;
        }

        shape.interactive = true;
        this.#gr.clear();

        return shape;
    }

    // Generates and returns a genuinely random irregular shape, with a random color
    constructIrregularShape(renderer) {
        const sides = this.#getRandomInt(3, 8);
        const color = this.#getRandomColor();

        this.#gr.beginFill(color);
        this.#gr.lineStyle(0);
        this.#gr.moveTo(100, 100);

        for(let i = 0; i <= sides; i++) {
            this.#gr.lineTo(this.#getRandomInt(100, 200), this.#getRandomInt(100, 200));
        }

        this.#gr.closePath();
        this.#gr.endFill();

        const shape = this.#getSprite(renderer);

        shape.interactive = true;
        this.#gr.clear();

        return shape;
    }

    #constructCircle(renderer) {
        const size = this.#getRandomInt(30, 60)
        this.#gr.drawCircle(30, size, size);
        this.#gr.endFill();

        return this.#getSprite(renderer);
    }

    #constructEllipse(renderer) {
        this.#gr.drawEllipse(600, 250, this.#getRandomInt(30, 60), this.#getRandomInt(30, 60));
        this.#gr.endFill();

        return this.#getSprite(renderer);
    }

    #constructRect(renderer) {
        this.#gr.drawRect(50, 50, this.#getRandomInt(30, 60), this.#getRandomInt(30, 60));
        this.#gr.endFill();

        return this.#getSprite(renderer);
    }

    #constructTriangle(renderer) {
        this.#gr.moveTo(100, 100);
        this.#gr.lineTo(160, 100);
        this.#gr.lineTo(130, 55);
        this.#gr.closePath();
        this.#gr.endFill();

        return this.#getSprite(renderer);
    }

    #constructPentagon(renderer) {
        this.#gr.moveTo(100, 100);
        this.#gr.lineTo(160, 100);
        this.#gr.lineTo(180, 50);
        this.#gr.lineTo(130, 10);
        this.#gr.lineTo(80, 50);
        this.#gr.closePath();
        this.#gr.endFill();

        return this.#getSprite(renderer);
    }

    #constructHexagon(renderer) {
        this.#gr.moveTo(100, 100);
        this.#gr.lineTo(150, 100);
        this.#gr.lineTo(170, 60);
        this.#gr.lineTo(150, 20);
        this.#gr.lineTo(100, 20);
        this.#gr.lineTo(80, 60);
        this.#gr.closePath();
        this.#gr.endFill();

        return this.#getSprite(renderer);
    }

    #constructPolygon(renderer, useSideCount) {
        let shape;

        switch (useSideCount) {
            case 3:
                shape = this.#constructTriangle(renderer);
                break;
            case 4:
                shape = this.#constructRect(renderer);
                break;
            case 5:
                shape = this.#constructPentagon(renderer);
                break;
            case 6:
                shape = this.#constructHexagon(renderer);
                break;
        }

        return shape;
    }

    #constructRandom(renderer) {
        let shape;
        const selector = this.#getRandomInt(1, 7);

        switch (selector) {
            case 1:
                shape = this.#constructCircle(renderer);
                break;
            case 2:
                shape = this.#constructEllipse(renderer);
                break;
            case 3:
                shape = this.#constructTriangle(renderer);
                break;
            case 4:
                shape = this.#constructRect(renderer);
                break;
            case 5:
                shape = this.#constructPentagon(renderer);
                break;
            case 6:
                shape = this.#constructHexagon(renderer);
                break;
        }

        return shape;
    }

    #getSprite(renderer) {
        return new PIXI.Sprite(renderer.generateTexture(this.#gr));
    }

    #getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min) + min);
    }

    #getRandomColor() {
        return "0x" + Math.floor(Math.random() * 0xFFFFFF << 0).toString(16)
    }

    #getRandomIntForTriangle() {
        return this.#getRandomInt(0, 100);
    }
}