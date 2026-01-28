const display = document.getElementById("display");
const historyDiv = document.getElementById("history");
const modeBtn = document.getElementById("modeBtn");

let isDegree = true;
let history = [];

function append(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function toggleMode() {
  isDegree = !isDegree;
  modeBtn.textContent = isDegree ? "DEG" : "RAD";
}

function calculate() {
  try {
    let expr = display.value
      .replace(/π/g, "Math.PI")
      .replace(/sqrt/g, "Math.sqrt")
      .replace(/log/g, "Math.log10")
      .replace(/ln/g, "Math.log")
      .replace(/sin/g, "Math.sin")
      .replace(/cos/g, "Math.cos")
      .replace(/tan/g, "Math.tan")
      .replace(/\^/g, "**");

    let result = eval(expr);
    history.unshift(`${display.value} = ${result}`);
    if (history.length > 5) history.pop();

    updateHistory();
    display.value = result;
  } catch {
    display.value = "Error";
  }
}

function updateHistory() {
  historyDiv.innerHTML = history.map(h => `<div>${h}</div>`).join("");
}

function clearHistory() {
  history = [];
  historyDiv.innerHTML = "";
}

/* Degree / Radian handling */
const _sin = Math.sin;
const _cos = Math.cos;
const _tan = Math.tan;

Math.sin = function (x) {
  return _sin(isDegree ? x * Math.PI / 180 : x);
};
Math.cos = function (x) {
  return _cos(isDegree ? x * Math.PI / 180 : x);
};
Math.tan = function (x) {
  return _tan(isDegree ? x * Math.PI / 180 : x);
};
let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.hidden = false;

  installBtn.addEventListener("click", async () => {
    installBtn.hidden = true;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
  });
});
