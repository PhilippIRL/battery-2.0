var percentageElem, fillerElem, chargingElem;
const RED = "#f00", GREEN = "#0f0";

var battery;

window.onload = () => {
    percentageElem = document.querySelector("#percentage");
    fillerElem = document.querySelector("#filler");
    chargingElem = document.querySelector("#chargingicon");
    navigator.getBattery().then(batteryinit, errorhandler);
}

window.onclick = () => {
    document.documentElement.requestFullscreen();
}

function updateDisplay(percentage, color, charging) {
    percentageElem.textContent = percentage + "%";
    fillerElem.style.height = percentage + "%";
    percentageElem.style.color = color;
    fillerElem.style.backgroundColor = color;
    chargingElem.style.opacity = charging ? "1" : "0";
}

function calculateColor(percentage, charging) {
    if(charging) {
        if(percentage >= 80) {
            return RED;
        }
    } else {
        if(percentage <= 30) {
            return RED;
        }
    }
    return GREEN;
}

function update() {
    var percentage = Math.floor(battery.level * 100);
    var charging = battery.charging;
    var color = calculateColor(percentage, charging);
    updateDisplay(percentage, color, charging);
}

function batteryinit(localBattery) {
    battery = localBattery;
    battery.addEventListener("levelchange", update);
    battery.addEventListener("chargingchange", update);
    update();
}

function errorhandler() {
    percentageElem.textContent = "error";
}