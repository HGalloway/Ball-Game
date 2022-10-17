export class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 70;
        this.score = 0;
    }

    drawPlayer(canvasContext) {
        canvasContext.strokeRect(this.x, this.y, this.width, this.height);
    }
}