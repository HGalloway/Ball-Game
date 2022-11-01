export class SettingsButton {
    constructor(GameEngine, Player) {
        this.GameEngine = GameEngine
        this.Player = Player

        this.settingsButton = document.getElementById("settings-button");
        this.settingsButton.addEventListener("click", () => { this.showModal() }, false);

        this.settingsModal = document.getElementById("settings-modal")

        this.settingsModalCloseButton = document.getElementById("settings-modal-close-button")
        this.settingsModalCloseButton.addEventListener("click", () => { this.closeModal() }, false);
    
        this.settingsPlayerSizeInput = document.getElementById("player-size-setting-input")
        this.settingsPlayerSizeInput.value = Player.width

        this.settingsDVDModeSwitch = document.getElementById("dvd-mode-checkbox")
    }

    showModal() {
        if (this.GameEngine.engineStatus == this.GameEngine.ENGINESTATUSES[0] || this.GameEngine.engineStatus == this.GameEngine.ENGINESTATUSES[2]) {
            this.settingsModal.style.display = "block"
        }       
    }

    closeModal() {
        this.settingsModal.style.display = "none"
        this.Player.width = this.settingsPlayerSizeInput.value
        if (this.settingsDVDModeSwitch.checked == false) {
            this.GameEngine.initObject("Ball")
        }
        else {
            this.GameEngine.initObject("DVD")
        }
        this.GameEngine.clearCanvas()
        this.GameEngine.drawCanvas()
    }
}

