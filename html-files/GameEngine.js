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
			this.Ball.checkPosition(this.canvas);
			this.Ball.bounceBall();
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
		this.radius = radius
        this.startAngle = 0
        this.endAngle = 2 * Math.PI

		this.DIRECTIONS = ["UP", "DOWN", "LEFT", "RIGHT"]
		this.COMBINED_DIRECTIONS = ["UP-LEFT", "UP-RIGHT", "DOWN-LEFT", "DOWN-RIGHT"]
		this.direction = this.DIRECTIONS[0]

		this.northMovementOptions = [this.COMBINED_DIRECTIONS[2], this.COMBINED_DIRECTIONS[3]] //this.DIRECTIONS[1], 
		this.southMovementOptions = [this.COMBINED_DIRECTIONS[0], this.COMBINED_DIRECTIONS[1]] //this.DIRECTIONS[0], 
		this.westMovementOptions = [this.COMBINED_DIRECTIONS[1], this.COMBINED_DIRECTIONS[3]] //this.DIRECTIONS[3], 
		this.eastMovementOptions = [this.COMBINED_DIRECTIONS[0], this.COMBINED_DIRECTIONS[2]] //this.DIRECTIONS[2], 

		this.movement = new Movement(this, 1)
    }

    drawBall(canvasContext) {
        canvasContext.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    }

	// this.DIRECTIONS = ["UP", "DOWN", "LEFT", "RIGHT", "UP-LEFT", "UP-RIGHT", "DOWN-LEFT", "DOWN-RIGHT"]
	bounceBall() {
		if (this.direction == this.DIRECTIONS[0]) {
			this.movement.moveUp()
		}
		else if (this.direction == this.DIRECTIONS[1]) {
			this.movement.moveDown()
		}
		else if (this.direction == this.DIRECTIONS[2]) {
			this.movement.moveLeft()
		}
		else if (this.direction == this.DIRECTIONS[3]) {
			this.movement.moveRight()
			
		}

		else if (this.direction == this.COMBINED_DIRECTIONS[0]) {
			this.movement.moveUpLeft()
		}
		else if (this.direction == this.COMBINED_DIRECTIONS[1]) {
			this.movement.moveUpRight()
		}
		else if (this.direction == this.COMBINED_DIRECTIONS[2]) {
			this.movement.moveDownLeft()
		}
		else if (this.direction == this.COMBINED_DIRECTIONS[3]) {
			this.movement.moveDownRight()
		}
	}

	/*
		this.DIRECTIONS = ["UP", "DOWN", "LEFT", "RIGHT"]
		this.COMBINED_DIRECTIONS = ["UP-LEFT", "UP-RIGHT", "DOWN-LEFT", "DOWN-RIGHT"]
		this.direction = this.DIRECTIONS[0]

		this.northMovementOptions = [this.DIRECTIONS[1], this.COMBINED_DIRECTIONS[2], this.COMBINED_DIRECTIONS[3]]
		this.southMovementOptions = [this.DIRECTIONS[0], this.COMBINED_DIRECTIONS[0], this.COMBINED_DIRECTIONS[1]]
		this.westMovementOptions = [this.DIRECTIONS[3], this.COMBINED_DIRECTIONS[1], this.COMBINED_DIRECTIONS[3]]
		this.eastMovementOptions = [this.DIRECTIONS[2], this.COMBINED_DIRECTIONS[0], this.COMBINED_DIRECTIONS[1]]
	*/


	checkPosition(canvas) {
		if (this.x > canvas.width) {
			console.log("Direction > than canvas width" + this.direction)
		}
		console.log()
		/* NOTE: SKETCH OUT THE LOGIC FOR HANDLING COMBINED DIRECTED INTERACTION WITH BOUNDARIES.  */

		/* 
			if current direction is a combined direction
				if current direction is going up and left 
					if the ball hits the west wall 
						change the direction to up and right
					if the ball hits the south wall
						change the direction up and right

				if current direction is going up and right
					if the ball hits the north wall
						change the direction to 
		*/

		// if (this.COMBINED_DIRECTIONS.includes(this.direction)) {
		// 	if (this.direction == this.COMBINED_DIRECTIONS[0]) {
		// 		/* 
		// 			if bounces of the west wall it needs to go up right
		// 			if it bounces off the south wall it needs to go up left
		// 		*/
		// 		if (this.x == 0 + this.radius) {
		// 			this.direction = this.COMBINED_DIRECTIONS[1]
		// 		}
		// 		else if (this.y == 0 + this.radius) {
		// 			this.direction = this.COMBINED_DIRECTIONS[0]
		// 		}
		// 	}
		// }
		if (this.y == 0 + this.radius) {
			this.direction = this.getNewDirection(this.northMovementOptions)
		}
		else if (this.y == canvas.height - this.radius) {
			this.direction = this.getNewDirection(this.southMovementOptions)
		}
		else if (this.x == 0 + this.radius) {
			this.direction = this.getNewDirection(this.westMovementOptions)
		}
		else if (this.x == canvas.width - this.radius) {
			this.direction = this.getNewDirection(this.eastMovementOptions)
		}
	}

	getNewDirection(directionOptions) {
		var randoNumber = Math.floor(Math.random() * directionOptions.length)

		return directionOptions[randoNumber]
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

class Movement {
	constructor (object, movementVelocity) {
		this.object = object
		this.movementVelocity = movementVelocity
	}

	moveLeft() {
		this.object.x -= this.movementVelocity
	}

	moveRight() {
		this.object.x += this.movementVelocity
	}

	moveDown() {
		this.object.y += this.movementVelocity
	}

	moveUp() {
		this.object.y -= this.movementVelocity
	}

	moveUpRight() {
		this.moveUp()
		this.moveRight()
	}

	moveUpLeft() {
		this.moveUp()
		this.moveLeft()
	}

	moveDownRight() {
		this.moveDown()
		this.moveRight()
	}

	moveDownLeft() {
		this.moveDown()
		this.moveLeft()
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