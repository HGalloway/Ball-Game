export class SimpleModal {
    constructor(GameEngine, name) {
        this.modal = document.getElementById(name + "-modal")

        this.openButton = document.getElementById(name + "-button")
        this.openButton.addEventListener("click", () => { this.showModal() }, false);

        this.modalCloseButton = document.getElementById(name + "-modal-close-button")
        this.modalCloseButton.addEventListener("click", () => { this.closeModal() }, false);

        this.GameEngine = GameEngine
    }

    showModal() {
        // STOPPED || ENDED
        if (this.GameEngine.engineStatus == this.GameEngine.ENGINESTATUSES[0] || this.GameEngine.engineStatus == this.GameEngine.ENGINESTATUSES[2] ||this.GameEngine.engineStatus == this.GameEngine.ENGINESTATUSES[3]) {
            this.modal.style.display = "block"
        }
    }

    closeModal() {
        this.modal.style.display = "none"
    }
}