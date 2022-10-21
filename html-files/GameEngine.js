class GameEngine {
    constructor(canvasName) {
		this.canvas = document.getElementById(canvasName)
		this.canvasContext = this.canvas.getContext("2d");

		this.Player = new Player(50);
		this.Ball = new Ball(150, 125, 5)

		// this.listenToKeyboardInput()
    }

    drawCanvas() {
        this.canvasContext.beginPath();
		// this.Player.drawPlayer(this.canvasContext);
		this.Ball.drawBall(this.canvasContext);
		this.canvasContext.fill();
    }

	clearCanvas() {
		this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height)
	}

    startEngine() {
    	setInterval(() => {
			this.Ball.bounceBall(this.canvas);
			this.clearCanvas();
			this.drawCanvas();
		}, 10)
    }

    listenToKeyboardInput(){
		document.addEventListener('keydown', (event) => {
			
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

	bounceBall(canvas) {
		if (this.x <= 0 + this.radius) {
			this.invertXVelocity()
			this.x += this.radius
		}
		if (this.x + this.radius >= canvas.width) {
			this.invertXVelocity()
			this.x = canvas.width - this.radius
		}
		if (this.y <= 0 + this.radius) {
			this.invertYVelocity()
			this.y += this.radius
		}
		if (this.y + this.radius >= canvas.height) {
			this.invertYVelocity()
			this.y = canvas.height - this.radius 
		}

		// this.yVelocity += this.gravity

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
        this.width = 40
        this.height = 5;

		this.previousX = this.x
		this.previousY = this.y

        this.score = 0;
    }

    drawPlayer(canvasContext) {
        canvasContext.fillRect(this.x, this.y, this.width, this.height);
    }

	clearPlayer(canvasContext) {
		canvasContext.clearRect(this.previousX, this.previousY, this.width, this.height)
	}
}

// Player Movement Code
// var keyName = event.key;
// if (keyName == "d") {
// 	if (this.Player.x != this.canvas.width - this.Player.width) {
// 		this.Player.previousX = this.Player.x
// 		this.Player.x += 5
// 	}
// 	console.log("Right: " + this.Player.x)
// }
// else if (keyName == "a") {
// 	if (this.Player.x != 0) {
// 		this.Player.previousX = this.Player.x
// 		this.Player.x -= 5
// 	}
// 	console.log("Left: " + this.Player.x)
// }