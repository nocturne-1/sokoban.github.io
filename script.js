const canvas = document.getElementById("sokobanCanvas");
const ctx = canvas.getContext("2d");

const startButton = document.getElementById("startButton")

startButton.addEventListener("click", () => {
    window.requestAnimationFrame(updateAll);

})

const Types = {
    1: "WALL",
    2: "PLAYER",
    3: "BOX",
    4: "TARGET",
}

const tileW = 66;
const tileH = 66;

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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();
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

    ctx.arc(x + (tileW/2), y + (tileH/2), tileW/2, 0, Math.PI * 2, true);
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
    
    ctx.clearRect(x + (tileW/4), y + (tileH/4), tileW/2, tileH/2);
    
    ctx.fillStyle = "#3D3D3D";
    ctx.fillRect(x + ((3*tileW)/8), y + ((3*tileH)/8), tileW/4, tileH/4);
}

function drawBackground(x, y) {
    ctx.beginPath();
    ctx.rect(x, y, tileW, tileH);
    ctx.fillStyle = "#90EE90";
    ctx.fill();
    ctx.closePath();
}

let playerX;
let playerY;
let playerRow;
let playerCol;
let playerIndex;

const drawMap = () => {
    for (let eachRow = 0; eachRow < gridRows; eachRow++) {
        for (let eachCol = 0; eachCol < gridCols; eachCol++) {
            let arrayIndex = map[eachRow * gridCols + eachCol];
            let tileType = Types[arrayIndex];
            
            drawBackground(eachCol * tileW, eachRow * tileH); 

            switch (tileType) {
                case 'WALL':
                    drawWall(eachCol * tileW, eachRow * tileH);
                    break;
                case 'PLAYER':
                    playerX = eachCol * tileW;
                    playerY = eachRow * tileH;
                    playerRow = playerY / tileH;
                    playerCol = playerX / tileW;
                    playerIndex = playerRow * gridCols + playerCol;
                    drawPlayer(playerX, playerY);
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

let dx = 66;
let dy = 66;

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp" || event.key ==="w") {
       if (Types[map[playerIndex - gridCols]] === "WALL") {
        return;
    } 
    else {
        ctx.clearRect(playerX, playerY, tileW, tileH);
        drawBackground(playerX, playerY);
        playerY -= dy;
        drawPlayer(playerX, playerY);
    }
    }
})



