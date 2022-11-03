export class Ball {
    constructor(x, y, radius) {
        this.x = x
        this.y = y

        this.radius = radius
        this.startAngle = 0
        this.endAngle = 2 * Math.PI

        this.xVelocity = 1
        this.yVelocity = 1
    }

    drawObject(canvasContext) {
        canvasContext.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle)
    }

    bounceObject(canvas, Player, GameEngine) {
        if (this.y >= canvas.height - this.radius) {
            GameEngine.resetEngine()
        }
        if (this.x <= this.radius) {
            this.invertXVelocity()
            this.x += this.radius
        }
        if (this.x + this.radius >= canvas.width) {
            this.invertXVelocity()
            this.x = canvas.width - this.radius
        }
        if (this.y <= this.radius) {
            this.invertYVelocity()
            this.y += this.radius
        }
        if (this.y + this.radius >= Player.y && this.y + this.radius <= Player.y + Player.height) {
            if (this.x + this.radius >= Player.x && this.x + this.radius <= Player.x + Player.width) {
                Player.handleColision(this)
            }
        }

        this.x += this.xVelocity
        this.y += this.yVelocity
    }

    invertYVelocity() {
        this.yVelocity = -this.yVelocity
    }

    invertXVelocity() {
        this.xVelocity = -this.xVelocity
    }

    resetObjectVariables(GameEngine) {
        this.x = GameEngine.objectInitX
        this.y = GameEngine.objectInitY
        this.xVelocity = 1
        this.yVelocity = 1
    }
}