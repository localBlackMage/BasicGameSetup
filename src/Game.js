import { requestAnimationFrame, cancelAnimationFrame, getDeltaTime } from './RequestAnimationFrame';
import { handleKeyDown, handleKeyUp, getKeys } from './Keyboard';
import Player from './Player';
import Canvas from './Canvas';

const GRAVITY = 300;
export default class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvasCtx = canvas.getContext('2d');
        this._requestID = null;

        this.player = new Player(400, 300, GRAVITY);
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
        let keys = getKeys();
        if (keys.ENTER.isDown) {
            this.exit();
        }
        this.player.handleInput(keys);
        this.player.update(deltaTime);
    }

    render() {
        Canvas.fillCanvas(this.canvasCtx, '#000000');
        this.player.render(this.canvasCtx);
    }

    run(timeStamp) {
        this.update(getDeltaTime());
        this.render();
        // Request the next frame
        this._requestID = requestAnimationFrame(this.run.bind(this));
    }
}