const canvas = document.getElementById("sokobanCanvas");
const ctx = canvas.getContext("2d");

let x = 100;
let y = 100;

let dx = 10;
let dy = 10;

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2, true);
    ctx.fillStyle = "#1E90FF";
    ctx.fill();
    ctx.closePath();
    x += dx;
    y += dy;
}

setInterval(draw, 10);
