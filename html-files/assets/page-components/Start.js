export class StartButton {
    constructor(GameEngine, ConsoleEngine) {
        this.startButton = document.getElementById("start-button");
        this.startButton.addEventListener("click", () => { this.handleStartButtonClick() }, false)

        this.GameEngine = GameEngine
        this.ConsoleEngine = ConsoleEngine
    }

    handleStartButtonClick() {
        //STOPPED || PAUSED
        if (this.GameEngine.engineStatus == this.GameEngine.ENGINESTATUSES[0] || this.GameEngine.engineStatus == this.GameEngine.ENGINESTATUSES[3]) {
            this.countdownThenStartEngine()
        }
        //STARTED
        else if (this.GameEngine.engineStatus == this.GameEngine.ENGINESTATUSES[1]) {
            this.GameEngine.pauseEngine()
            this.startButton.innerHTML = "Start"
        }
        //ENDED
        else if (this.GameEngine.engineStatus == this.GameEngine.ENGINESTATUSES[2]) {
            this.GameEngine.clearCanvas()
            this.GameEngine.drawCanvas()
            this.countdownThenStartEngine()
        }
    }

    countdownThenStartEngine() {
        this.startButton.classList.add("disabled")
        this.ConsoleEngine.countdown(3)
        setTimeout(() => {
            this.startButton.classList.remove("disabled")
            this.GameEngine.startEngine()
            this.startButton.innerHTML = "Pause"
        }, 4000)
    }
}