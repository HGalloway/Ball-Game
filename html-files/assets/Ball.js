export class Ball {
    constructor(x, y, radius) {
        this.x = x
        this.y = y
        this.radius = radius
        this.startAngle = 0
        this.endAngle = 2 * Math.PI
    }

    drawBall(canvasContext) {
        canvasContext.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    }
}