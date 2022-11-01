export class Player {
    constructor(x) {
        this.x = x;
        this.y = 125

        this.xVelocity = 0

        this.width = 40
        this.height = 5;

        this.isMoving = false
        this.MOVEMENTOPTIONS = ["LEFT", "RIGHT", null]
        this.movingWhichWay

        this.score = 0;
        this.ConsoleEngine
    }

    drawPlayer(canvasContext) {
        canvasContext.fillRect(this.x, this.y, this.width, this.height);
    }

    getConsoleEngine(ConsoleEngine) {
        this.ConsoleEngine = ConsoleEngine
    }

    movePlayer(keyPressed, canvas) {
        if (keyPressed == "d") {
            if (this.x != canvas.width - this.width) {
                this.moveRight()
            }
        }
        else if (keyPressed == "a") {
            if (this.x != 0) {
                this.moveLeft()
            }
        }
        else {
            this.doNotMove()
        }
    }

    moveLeft() {
        this.xVelocity = -10
        this.x += this.xVelocity
    }

    moveRight() {
        this.xVelocity = 10
        this.x += this.xVelocity
    }

    doNotMove() {
        this.xVelocity = 0
    }

    handleColision(Object) {
        if (Math.sign(this.xVelocity) == -1) {
            if (Math.sign(Object.xVelocity) == 1) {
                Object.invertXVelocity()
            }
        }
        else if (Math.sign(this.xVelocity) == 1) {
            if (Math.sign(Object.xVelocity) == -1) {
                Object.invertXVelocity()
            }
        }
        else {
            Object.invertXVelocity()
        }
        Object.invertYVelocity()
        this.score++
        this.ConsoleEngine.showScore(this.score)
    }

    resetPlayerVariables(GameEngine) {
        this.x = GameEngine.playerInitX
        this.score = 0
    }
}