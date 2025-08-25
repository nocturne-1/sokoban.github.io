const canvas = document.getElementById("sokobanCanvas");
const ctx = canvas.getContext("2d");

let x = canvas.width / 4;
let y = 40;

let dx = 10;
let dy = 10;

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.Pi * 2, true);
    ctx.fillStyle = "rgb(255 0 0 / 50%)";
    ctx.fill();
    ctx.closePath();

    x += dx;
    y += dy;

}

setInterval(draw, 10);
