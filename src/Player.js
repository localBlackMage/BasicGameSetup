import Canvas from './Canvas';

export default class Player {
    constructor(x, y, gravity) {
        this.spriteSheet = new Image();
        this.spriteSheet.src = './assets/player.png';

        this.frame = {x: 0, y: 0};
        this.frameSize = {width: 150, height: 207};

        this.position = {x: 0, y: 0};
        this.velocity = {x: 0, y: 0};

        this._gravity = gravity;
    }

    handleInput(keys) {
        // Reset the x velocity in case the player stopped pressing a button
        this.velocity.x = 0;

        // Move Left
        if (keys.LEFT.isDown) {
            this.velocity.x = -100;
        }
        // Move Right
        if (keys.RIGHT.isDown) {
            this.velocity.x = 100;
        }

        // Jump!
        if (keys.UP.isDown) {
            this.velocity.y = -100;
        }
    }

    update(deltaTime) {
        // Move the player's y velocity towards the gravity constant
        if (this.velocity.y < this._gravity) {
            this.velocity.y += this._gravity * deltaTime;
        }
        else {
            this.velocity.y = this._gravity;
        }

        // Move the player's position by the player's velocity * deltaTime
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
    }

    render(canvasCtx) {
        //Canvas.drawImage(canvasCtx, this.position.x, this.position.y, this.sprite);
        Canvas.drawSprite(canvasCtx, this.spriteSheet, this.frame.x, 0, this.frameSize.width, this.frameSize.height, this.position.x, this.position.y, 48, 64);
    }
}