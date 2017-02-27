import { requestAnimationFrame, cancelAnimationFrame, getDeltaTime } from './RequestAnimationFrame';
import { handleKeyDown, handleKeyUp, getKeys } from './Keyboard';
import Canvas from './Canvas';


export default class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvasCtx = canvas.getContext('2d');

        this._requestID = null;
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
        if (keys.LEFT.isDown) {
            console.log('Left pressed');
        }
        if (keys.RIGHT.isDown) {
            console.log('Right pressed');
        }
        if (keys.ENTER.isDown) {
            this.exit();
        }

        /* TODO: FILL ME IN! */
    }

    render() {
        Canvas.fillCanvas(this.canvasCtx, '#000000');

        /* TODO: FILL ME IN! */
    }

    run(timeStamp) {
        this.update(getDeltaTime());
        this.render();

        // Request the next frame
        this._requestID = requestAnimationFrame(this.run.bind(this));
    }
}