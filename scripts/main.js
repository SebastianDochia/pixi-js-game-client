const START_HEIGHT = -150;
let SHAPES_PER_SECOND = 1000;
let GRAVITY = 1;

const canvas = document.querySelector(".canvas");
const countDisplay = document.querySelector(".display h3");
const spsDisplay = document.querySelector("#sps");
const gravDisplay = document.querySelector("#grav");

const builder = new ShapeBuilder();
const shapes = [];
let buildInterval;


const app = new PIXI.Application({
    resizeTo: canvas,
    resolution: window.devicePixelRatio || 1,
    antialias: true,
    backgroundColor: "0xffffff"
});

let timerSetter = () => {
    clearInterval(interval);
    createShape();
    interval = setInterval(timerSetter, SHAPES_PER_SECOND);
}

let interval = setInterval(timerSetter, SHAPES_PER_SECOND);

window.addEventListener('DOMContentLoaded', (event) => {
    canvas.appendChild(app.view);

    gravDisplay.textContent = GRAVITY;
    spsDisplay.textContent = 1000/SHAPES_PER_SECOND;
    createBackground();

    app.ticker.add((delta) => {
        updateCount();

        shapes.forEach(shape => {
            shape.y = shape.y + delta * GRAVITY;

            if (shape.y > app.screen.height) {
                destroyShape(shape);
            }
        });
    });

});

function createShape() {
    const newShape = builder.constructShape(app);
    newShape.x = getRandomStart();
    newShape.y = START_HEIGHT;
    newShape.on('pointerdown', (event) => destroyShape(newShape));

    app.stage.addChild(newShape);
    shapes.push(newShape);
}

function updateCount() {
    countDisplay.textContent = shapes.length;
}

function getRandomStart() {
    return Math.random() * (app.screen.width - 60);
}

function destroyShape(shape) {
    const index = shapes.indexOf(shape);
    if (index > -1) {
        shapes.splice(index, 1);
    }

    shape.destroy();
}

function changeGravity(gravityDelta) {
    if(GRAVITY + gravityDelta > 0) {
        GRAVITY += gravityDelta;
        gravDisplay.textContent = roundTwoDecimals(GRAVITY);
    }
}

function changeSPS(spsDelta) {
    if(SHAPES_PER_SECOND + spsDelta > 0) {
        SHAPES_PER_SECOND += spsDelta;
        spsDisplay.textContent = roundTwoDecimals(1000/SHAPES_PER_SECOND);
    }
}

function roundTwoDecimals(number) {
    return Math.round((number + Number.EPSILON) * 100) / 100;
}

function createBackground() {
    gr = new PIXI.Graphics();

    gr.beginFill("0xffffff");
    gr.lineStyle(0);
    gr.drawRect(0, 0, app.screen.width, app.screen.height);
    gr.endFill();

    gr.interactive = true;
    gr.on('pointerdown', (event) => {
        renderer = app.renderer;
        const location = renderer.plugins.interaction.mouse.global;

        const newShape = builder.constructIrregularShape(renderer);
        newShape.x = location.x;
        newShape.y = location.y;
        newShape.on('pointerdown', (event) => destroyShape(newShape));

        app.stage.addChild(newShape);
        shapes.push(newShape);
    });

    app.stage.addChild(gr);
}