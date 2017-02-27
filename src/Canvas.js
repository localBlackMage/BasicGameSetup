let defaultFont = "12px Verdana";
const decToHex = {
    "10": "A",
    "11": "B",
    "12": "C",
    "13": "D",
    "14": "E",
    "15": "F"
};
const hexToDec = {
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15
};

export default class CanvasDraw {
    constructor() {
    }

    static setDefaultFont(newFont) {
        if (newFont) {
            defaultFont = newFont
        }
    }

    static clearCanvas(canvasContext) {
        canvasContext.clearRect(0, 0, canvasContext.canvas.width + 1, canvasContext.canvas.height + 1);
    }

    static fillCanvas(canvasContext, color) {
        canvasContext.fillStyle = color;
        canvasContext.fillRect(0, 0, canvasContext.canvas.width + 1, canvasContext.canvas.height + 1);
    }

    static drawCircle(canvasContext, x, y, r, c) {
        canvasContext.beginPath();
        canvasContext.arc(x, y, r, 0, 2 * Math.PI, false);
        canvasContext.fillStyle = c;
        canvasContext.fill();
        canvasContext.strokeStyle = c;
        canvasContext.stroke();
        canvasContext.closePath();
    }

    static drawRing(canvasContext, x, y, r, c) {
        canvasContext.beginPath();
        canvasContext.arc(x, y, r, 0, 2 * Math.PI, false);
        canvasContext.strokeStyle = c;
        canvasContext.stroke();
        canvasContext.closePath();
    }

    static drawSquare(canvasContext, box, color) {
        canvasContext.fillStyle = color;
        canvasContext.fillRect(box.x, box.y, box.width, box.height);
    }

    static drawLine(canvasContext, sX, sY, eX, eY, c) {
        canvasContext.beginPath();
        canvasContext.moveTo(sX, sY);
        canvasContext.lineTo(eX, eY);
        canvasContext.strokeStyle = c;
        canvasContext.stroke();
        canvasContext.closePath();
    }

    static drawGrid(canvasContext, box, spacing, color) {
        for (var y = 0; y < box.height; y += spacing) {
            drawLine(canvasContext, 0, y, box.width, y, color);
        }
        for (var x = 0; x < box.width; x += spacing) {
            drawLine(canvasContext, x, 0, x, box.height, color);
        }
        drawLine(canvasContext, box.width - 1, 0, box.width - 1, box.height, color);
        drawLine(canvasContext, 0, box.height - 1, box.width, box.height - 1, color);
    }

    static drawText(canvasContext, x, y, c, s) {
        canvasContext.font = defaultFont;
        canvasContext.fillStyle = c;
        canvasContext.fillText(s, x, y);
    }

    static drawImage(canvasContext, x, y, img) {
        canvasContext.drawImage(img, x, y);
    }

    /**
     * Draws a sprite from a sprite sheet
     * @param canvasContext - Canvas element's context property
     * @param img - Image, spriteSheet
     * @param sX - x offset into the spriteSheet
     * @param sY - y offset into the spriteSheet
     * @param sW - width of the sprite
     * @param sH - height of the sprite
     * @param dX - x coordinate to draw the sprite at
     * @param dY - y coordinate to draw the sprite at
     * @param dW - width to draw the sprite at
     * @param dH - height to draw the sprite at
     */
    static drawSprite(canvasContext, img, sX, sY, sW, sH, dX, dY, dW, dH) {
        canvasContext.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
    }

    static getColorValueForHex(value) {
        value = !Number.isFinite(value) && value ? value.toUpperCase() : value;
        return hexToDec[value] || value;
    }

    static getHexValueForColor(value) {
        return decToHex[value] || value;
    }

    static isValueAcceptableHexValue(value) {
        return Number.isFinite(value) && Number.isSafeInteger(value) && value >= 0 && value <= 15;
    }

    static convertValueToHexOrMinimum(value, minimum) {
        value = getColorValueForHex(value);
        return isValueAcceptableHexValue(value) ? value : minimum;
    }

    static getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}