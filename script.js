const canvas = document.getElementById("sokobanCanvas");
const ctx = canvas.getContext("2d");

const Types = {
    1: WALL,
    2: PLAYER,
    3: BOX,
    4: TARGET,
}

const tileW = 40;
const tileH = 40;

const gridRows = 9;
const gridCols = 15;

const map = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
    0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 1, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 
    0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 1, 1, 0, 0, 0, 
    0, 0, 0, 1, 0, 0, 0, 4, 0, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
]

const updateAll = () => {
    window.requestAnimationFrame(updateAll);

}

window.onload = () => {
    window.requestAnimationFrame(updateAll);

}

function drawWall(x, y) {
    ctx.beginPath();
    ctx.rect(x, y, tileW, tileH);
    ctx.fillStyle = "#964B00";
    ctx.fill();
    ctx.closePath();
}

function drawPlayer(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, tileW/2, 0, Math.PI * 2, true);
    ctx.fillStyle = "#1E90FF";
    ctx.fill();
    ctx.closePath();
}

function drawBox(x, y) {
    ctx.beginPath();
    ctx.rect(x, y, tileW, tileH);
    ctx.fillStyle = "#F8E473";
    ctx.fill();
    ctx.closePath();
}

function drawTarget(x, y) {
    ctx.fillStyle = "#3D3D3D";
    ctx.fillRect(x, y, tileW, tileH);
    
    ctx.fillStyle = "#90EE90";
    ctx.fillRect(x, y, tileW/2, tileH/2);
    
    ctx.fillStyle = "#3D3D3D";
    ctx.fillRect(x, y, tileW/4, tileH/4);
}

function drawBackground() {
    ctx.beginPath();
    ctx.arc(x, y, tileW/2, 0, Math.PI * 2, true);
    ctx.fillStyle = "#90EE90";
    ctx.fill();
    ctx.closePath();
}

const drawMap = () => {
    for (let eachRow = 0; eachRow < gridRows; eachRow++) {
        for (let eachCol = 0; eachCol < gridCols; eachCol++) {
            let arrayIndex = map[eachRow * gridCols + eachCol];
            let tileType = Types[arrayIndex];

            switch (tileType) {
                case 'WALL':
                    drawWall(eachCol * tileW, eachRow * tileH);
                    break;
                case 'PLAYER':
                    drawPlayer(eachCol * tileW, eachRow * tileH);
                    break;
                case 'BOX':
                    drawBox(eachCol * tileW, eachRow * tileH);
                    break;
                case 'TARGET':
                    drawTarget(eachCol * tileW, eachRow * tileH);
                    break;
                default: 
                    drawBackground(eachCol * tileW, eachRow * tileH);
                    break;
            }
        }
    }
}
