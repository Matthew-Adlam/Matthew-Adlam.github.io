// ---------- GRID -----------------

const COLS = 25;
const ROWS = 20;
const CELL = 32;

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const statusEl = document.getElementById("status");

canvas.width = COLS * CELL;
canvas.height = ROWS * CELL;

// -------- PLAYERS ----------------

// still need to do AI tributes 
class Tribute {
    constructor(name,x,y,colour) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.health = 100;
    }
    get isAlive() {return this.health > 0}
}

const tributes = [];
const player = new Tribute("Player", Math.floor(COLS / 2), Math.floor(ROWS / 2), "dodgerblue");
tributes.push(player);

// ----------- MOVEMENT ----------------

function inBounds(x, y) {
  return x >= 0 && x < COLS && y >= 0 && y < ROWS;
}

function tryMove(t, dx, dy) {
  const nx = t.x + dx;
  const ny = t.y + dy;
  if (!inBounds(nx, ny)) return false;

  // need to check for other tributes later
}

const KEYS = {
  ArrowUp: [0, -1],    w: [0, -1],
  ArrowDown: [0, 1],   s: [0, 1],
  ArrowLeft: [-1, 0],  a: [-1, 0],
  ArrowRight: [1, 0],  d: [1, 0],
};

window.addEventListener("keydown", (e) => {
  const move = KEYS[e.key] || KEYS[e.key.toLowerCase()];
  if (!move) return;
  e.preventDefault(); // stop arrow keys scrolling the page
  tryMove(player, move[0], move[1]);
  draw();
});

// ---- DRAW GRID ----

function draw() {
  // Grid cells
  ctx.strokeStyle = "#3c5a3c";
  ctx.fillStyle = "#5a8c50";
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      ctx.fillRect(x * CELL, y * CELL, CELL, CELL);
      ctx.strokeRect(x * CELL, y * CELL, CELL, CELL);
    }
  }
}

// ------- DRAW TRIBUTES -----

for (const t of tributes) {
    if (!t.isAlive) continue;
    ctx.beginPath();
    ctx.arc(t.x * CELL + CELL / 2, t.y * CELL + CELL / 2, CELL / 2 - 4, 0, Math.PI * 2);
    ctx.fillStyle = t.color;
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
}