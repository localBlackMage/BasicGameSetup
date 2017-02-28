import { requestAnimationFrame, cancelAnimationFrame, getDeltaTime } from './RequestAnimationFrame';
import { handleKeyDown, handleKeyUp, getKeys } from './Keyboard';
import Canvas from './Canvas';

const GRAVITY = 300;
export default class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvasCtx = canvas.getContext('2d');

        this._requestID = null;

        this.mario = new Image();
        this.mario.src = './assets/mario.png';

        this.marioSheet = new Image();
        this.marioSheet.src = './assets/marioSpriteSheet.png';
        this.marioX = 0;
        this.marioY = 0;
        this.marioVelocityX = 0;
        this.marioVelocityY = 0;
    }

    start() {
        this._requestID = requestAnimationFrame(this.run.bind(this));
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
    }

    exit() {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
        cancelAnimationFrame(this._requestID);
    }

    update(deltaTime) {
        this.marioVelocityX = 0;

        let keys = getKeys();
        if (keys.LEFT.isDown) {
            this.marioVelocityX = -100;
        }
        if (keys.RIGHT.isDown) {
            this.marioVelocityX = 100;
        }
        if (keys.ENTER.isDown) {
            this.exit();
        }

        if (keys.UP.isDown) {
            this.marioVelocityY = -100;
        }

        if (this.marioVelocityY < GRAVITY) {
            this.marioVelocityY += GRAVITY * deltaTime;
        }
        else {
            this.marioVelocityY = GRAVITY;
        }

        this.marioX += this.marioVelocityX * deltaTime;
        this.marioY += this.marioVelocityY * deltaTime;
    }

    render() {
        Canvas.fillCanvas(this.canvasCtx, '#000000');

        Canvas.drawImage(this.canvasCtx, this.marioX, this.marioY, this.mario);
        //Canvas.drawSprite(this.canvasCtx, this.marioSheet, 0, 0, 16, 16, 0, 0, 128, 128);
    }

    run(timeStamp) {
        this.update(getDeltaTime());
        this.render();

        // Request the next frame
        this._requestID = requestAnimationFrame(this.run.bind(this));
    }
}