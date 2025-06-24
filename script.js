function openApp(id) {
  document.getElementById(id).style.display = "flex";
}

function closeApp(id) {
  document.getElementById(id).style.display = "none";
}

// Calcolatrice
function addCalc(val) {
  document.getElementById("calcInput").value += val;
}

function calculate() {
  try {
    document.getElementById("calcInput").value = eval(document.getElementById("calcInput").value);
  } catch {
    document.getElementById("calcInput").value = "Errore";
  }
}

function clearCalc() {
  document.getElementById("calcInput").value = "";
}

// Simulazione browser (apre il sito in nuova scheda)
function simulateBrowser(event) {
  if (event.key === "Enter") {
    const url = event.target.value;
    if (!url.startsWith("http")) {
      alert("Inserisci un URL completo, ad es: https://google.com");
    } else {
      window.open(url, "_blank");
    }
  }
}

// Disegno Paint
function draw(e, ctx, canvas) {
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.strokeStyle = document.getElementById("paintColor").value;

  const rect = canvas.getBoundingClientRect();
  ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

window.onload = () => {
  // Calcolatrice
  const keys = "123+456-789*0=/CLR".split('');
  const container = document.querySelector(".calc-buttons");
  keys.forEach(k => {
    const btn = document.createElement("button");
    btn.textContent = k === "CLR" ? "C" : k;
    btn.onclick = () => {
      if (k === "=") calculate();
      else if (k === "CLR") clearCalc();
      else addCalc(k);
    };
    container.appendChild(btn);
  });

  // Orologio
  setInterval(() => {
    const now = new Date();
    const clockDisplay = document.getElementById("clockDisplay");
    if (clockDisplay) clockDisplay.innerText = now.toLocaleTimeString();
  }, 1000);

  // Paint
  const canvas = document.getElementById("canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let painting = false;

    // Evita disegno se clicchi sull'input colore o altri elementi UI
    canvas.addEventListener("mousedown", e => {
      const isUIElement = e.target.closest('.paint-controls');
      if (isUIElement) return;

      painting = true;
      draw(e, ctx, canvas);
    });

    canvas.addEventListener("mouseup", () => {
      painting = false;
      ctx.beginPath();
    });

    canvas.addEventListener("mousemove", e => {
      if (!painting) return;
      draw(e, ctx, canvas);
    });

    window.clearCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }
};

