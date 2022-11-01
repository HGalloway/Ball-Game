export class ConsoleEngine {
    constructor() {
        this.console = document.getElementById("console")

        this.countdownInterval
    }

    countdown(time) {
        this.countdownInterval = setInterval(() => {
            if (time != -1) {
                this.console.innerHTML = time
                time--
            }
            else {
                clearInterval(this.countdownInterval)
            }
        }, 1000)
    }

    showScore(score) {
        this.console.innerHTML = score
    }
}