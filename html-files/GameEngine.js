class GameEngine {
    constructor(canvasName) {
		this.canvas = document.getElementById(canvasName)
		this.canvasContext = this.canvas.getContext("2d");

		this.Player = new Player(50);
		this.Ball = new Ball(50, 50, 15)

		this.listenToKeyboardInput()
    }

	clearCanvas() {
		// this.Player.clearPlayer(this.canvasContext);
		this.Ball.clearBall(this.canvasContext)
	}

    drawCanvas() {
        this.canvasContext.beginPath();
		// this.Player.drawPlayer(this.canvasContext);
		this.Ball.drawBall(this.canvasContext);
		this.canvasContext.fill();
    }

    startEngine() {
    	setInterval(() => {
			this.Ball.bounceBall();
			this.clearCanvas();
			this.drawCanvas();
		}, 10)
    }

    listenToKeyboardInput(){
		document.addEventListener('keydown', (event) => {
			var keyName = event.key;
			if (keyName == "d") {
				if (this.Player.x != this.canvas.width - this.Player.width) {
					this.Player.previousX = this.Player.x
					this.Player.x += 5
				}
				console.log("Right: " + this.Player.x)
			}
			else if (keyName == "a") {
				if (this.Player.x != 0) {
					this.Player.previousX = this.Player.x
					this.Player.x -= 5
				}
				console.log("Left: " + this.Player.x)
			}
		}, false);
    }
}

class Ball {
    constructor(x, y, radius) {
        this.x = x
        this.y = y
        this.radius = radius
        this.startAngle = 0
        this.endAngle = 2 * Math.PI

		this.previousX = this.x
		this.previousY = this.y


		this.DIRECTIONS = ["NORTH", "SOUTH", "EAST", "WEST", "NORTH-EAST", "NORTH-WEST", "SOUTH-EAST", "SOUTH-WEST"]
		this.direction = this.DIRECTIONS[0]
    }

    drawBall(canvasContext) {
        canvasContext.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    }

	clearBall(canvasContext) {

	}

	bounceBall(canvas) {
		if (this.x == 0 || this.x == canvas.width) // - Ball.width)
		switch(this.direction) {
			case(this.DIRECTIONS[0]):
				this.y += 5
		}
	}
}

class Player {
    constructor(x) {
	console.log(document)
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
