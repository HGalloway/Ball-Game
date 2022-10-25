class GameEngine {
    constructor(canvasName) {
		this.canvas = document.getElementById(canvasName)
		this.canvasContext = this.canvas.getContext("2d");

		this.Player = new Player(50);
		this.Ball = new Ball(150, 0, 5)

		this.listenToKeyboardInput()
    }

    drawCanvas() {
        this.canvasContext.beginPath();
		this.Player.drawPlayer(this.canvasContext);
		this.Ball.drawBall(this.canvasContext);
		this.canvasContext.fill();
    }

	clearCanvas() {
		this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height)
	}

    startEngine() {
    	var engineInterval = setInterval(() => {
			this.Ball.bounceBall(this.canvas, this.Player, engineInterval);
			this.clearCanvas();
			this.drawCanvas();
		}, 10)
    }

    listenToKeyboardInput(){
		document.addEventListener('keydown', (event) => {
			this.Player.movePlayer(event.key, this.canvas)
		}, false);
    }
}

class Ball {
    constructor(x, y, radius) {
        this.x = x
        this.y = y

		this.xVelocity = 1
		this.yVelocity = 1

		this.radius = radius
        this.startAngle = 0
        this.endAngle = 2 * Math.PI
    }

    drawBall(canvasContext) {
        canvasContext.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);

    }

	bounceBall(canvas, Player, engineInterval) {
		if (this.y > Player.y + this.radius) {
			clearInterval(engineInterval)
			console.log("You Lose!")
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
		if (this.y + this.radius >= canvas.height) {
			this.invertYVelocity()
			this.y = canvas.height - this.radius 
		}
		if (this.x + this.radius >= Player.x && this.x + this.radius <= Player.x + Player.width && this.y + this.radius >= Player.y && this.y + this.radius <= Player.y + Player.height) {
			Player.handleColision(this)
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
}

class Player {
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
    }

    drawPlayer(canvasContext) {
        canvasContext.fillRect(this.x, this.y, this.width, this.height);
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


	// this.MOVEMENTOPTIONS = ["LEFT", "RIGHT", null]
	handleColision(Ball) {
		if (Math.sign(this.xVelocity) == -1) {
			if (Math.sign(Ball.xVelocity) == 1) {
				Ball.invertXVelocity()
			}
		}
		else if (Math.sign(this.xVelocity) == 1) {
			if (Math.sign(Ball.xVelocity) == -1) {
				Ball.invertXVelocity()
			}
		}
		else {
			Ball.invertXVelocity()
		}
		Ball.invertYVelocity()
	}
}

class Score {

}