export class ConsoleEngine {
    constructor(Player) {
        this.console = document.getElementById("console")

        this.countdownInterval

        this.Player = Player
    }

    countdown(time) {
        this.countdownInterval = setInterval(() => {
            if (time != -1) {
                this.outputToConsole(time)
                time--
            }
            else {
                clearInterval(this.countdownInterval)
                this.outputToConsole(this.Player.score)
            }
        }, 1000)
    }

    outputToConsole(text) {
        this.console.innerHTML = text
    }
}