import { Player } from "../game-objects/Player.mjs";
import { Ball } from "../game-objects/Ball.mjs";
import { DVD } from "../game-objects/DVD.js"

export class GameEngine {
    constructor(canvasName) {
		this.canvas = document.getElementById(canvasName)
		this.canvasContext = this.canvas.getContext("2d")

		this.objectInitX = 150
		this.objectInitY = 15
		this.Object = new Ball(this.objectInitX, this.objectInitY, 5)

		this.playerInitX = 130
		this.Player = new Player(this.playerInitX)

		this.ENGINESTATUSES = ['STOPPED', 'RUNNING', 'ENDED', 'PAUSED']
		this.engineStatus = this.ENGINESTATUSES[0]
		this.engineInterval

		this.startButton = document.getElementById("start-button")

		this.isKeyPressAllowed = false
		this.listenToKeyboardInput()
    }

	initObject(objectName) {
		if (objectName == "Ball") {
			this.Object = new Ball(this.objectInitX, this.objectInitY, 5)
		}
		else if (objectName == "DVD") {
			this.Object = new DVD(this.objectInitX - 15, this.objectInitY)
		}
	}

    drawCanvas() {
        this.canvasContext.beginPath()
		this.Player.drawPlayer(this.canvasContext)
		this.Object.drawObject(this.canvasContext)
		this.canvasContext.fill()
    }

	clearCanvas() {
		this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

    startEngine() {
		this.engineStatus = this.ENGINESTATUSES[1] //RUNNING
    	this.engineInterval = setInterval(() => {
			this.Object.bounceObject(this.canvas, this.Player, this);
			this.clearCanvas();
			this.drawCanvas();
		}, 10)
		this.isKeyPressAllowed = true
    }

	pauseEngine() {
		clearInterval(this.engineInterval)
		this.engineStatus = this.ENGINESTATUSES[3] //PAUSED
		this.isKeyPressAllowed = false
	}

	resetEngine() {
		clearInterval(this.engineInterval)
		this.startButton.innerHTML = "Restart"
		this.engineStatus = this.ENGINESTATUSES[2] //ENDED
		this.isKeyPressAllowed = false

		setTimeout(() => {
			this.Player.resetPlayerVariables(this)
			this.Object.resetObjectVariables(this)
		}, 500)
	}

    listenToKeyboardInput(){
		document.addEventListener('keydown', (event) => {
			if (this.isKeyPressAllowed == true) {
				this.Player.movePlayer(event.key, this.canvas)
			}
		}, false);
    }
}