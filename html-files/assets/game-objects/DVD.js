export class DVD {
    constructor(x, y) {        
        this.x = x
        this.y = y

        this.width = 35
        this.height = 20

        this.xVelocity = 1
        this.yVelocity = 1
        
        this.DVDSVG = document.getElementById('dvd-svg')
    }

    drawObject(canvasContext) {
        canvasContext.drawImage(this.DVDSVG, this.x, this.y, this.width, this.height);
    }

    bounceObject(canvas, Player, GameEngine) {
        if (this.y >= canvas.height - (this.height + 10)) {
            GameEngine.resetEngine()
        }
        if (this.x <= 0) {
            this.invertXVelocity()
        }
        if (this.x >= canvas.width - (this.width + 2)) {
            this.invertXVelocity()
        }
        if (this.y <= 0) {
            this.invertYVelocity()
        }
        if (this.y + this.height >= Player.y && this.y + this.height <= Player.y) {
            if (this.x + this.width >= Player.x && this.x <= Player.x + Player.width) {
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
        this.x = GameEngine.objectInitX - 15
        this.y = GameEngine.objectInitY
        this.xVelocity = 1
        this.yVelocity = 1
    }
}