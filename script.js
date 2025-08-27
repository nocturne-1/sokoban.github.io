const canvas = document.getElementById("sokobanCanvas");
const ctx = canvas.getContext("2d");

const startButton = document.getElementById("startButton")

startButton.addEventListener("click", () => {
    window.requestAnimationFrame(updateAll);

})

const Types = {
    1: "WALL",
    2: "PLAYER",
    3: "BOX1",
    4: "BOX2",
    5: "TARGET1",
    6: "TARGET2",
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
    0, 0, 0, 1, 0, 2, 0, 4, 0, 5, 1, 1, 0, 0, 0, 
    0, 0, 0, 1, 0, 0, 0, 6, 0, 0, 0, 1, 0, 0, 0,
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

let box1X;
let box1Y;
let box1Row;
let box1Col;
let box1Index;

let box2X;
let box2Y;
let box2Row;
let box2Col;
let box2Index;

let target1Index = 69;
let target2Index = 82;


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
                case 'BOX1':
                    box1X = eachCol * tileW;
                    box1Y = eachRow * tileH;
                    box1Row = box1Y / tileH;
                    box1Col = box1X / tileW;
                    box1Index = box1Row * gridCols + box1Col;
                    drawBox(eachCol * tileW, eachRow * tileH);
                    break;
                case 'BOX2':
                    box2X = eachCol * tileW;
                    box2Y = eachRow * tileH;
                    box2Row = box2Y / tileH;
                    box2Col = box2X / tileW;
                    box2Index = box2Row * gridCols + box2Col;
                    drawBox(eachCol * tileW, eachRow * tileH);
                    break;
                case 'TARGET1':
                    drawTarget(eachCol * tileW, eachRow * tileH);
                    break;
                case 'TARGET2':
                    drawTarget(eachCol * tileW, eachRow * tileH);
                    break;
                default: 
                    drawBackground(eachCol * tileW, eachRow * tileH);
                    break;
            }
        }
    }
}

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp" || event.key ==="w") {
        if (Types[map[playerIndex - gridCols]] === "WALL") {
            return;
        } 
        else if (Types[map[playerIndex - gridCols]] === ("BOX1" || "BOX2") && Types[map[playerIndex - (2 * gridCols)]] === ("WALL" || "BOX1" || "BOX2")) {
            return;
        }
        else if (Types[map[playerIndex - gridCols]] === ("BOX1") && Types[map[playerIndex - (2 * gridCols)]] !== ("WALL" || "BOX2")) {
            map[box1Index] = 0;
            map[playerIndex] = 0;

            box1Row -= 1
            box1Index = box1Row * gridCols + box1Col;

            map[box1Index] = 3;

            playerRow -= 1;
            playerIndex = playerRow * gridCols + playerCol;
            map[playerIndex] = 2;

            if (playerIndex - playerCol === target1Index ) {
                map[target1Index] = 5;
            }
            else if (playerIndex - playerCol === target2Index ) {
                map[target2Index] = 6;
            }
        }
        else if (Types[map[playerIndex - gridCols]] === ("BOX2") && Types[map[playerIndex - (2 * gridCols)]] !== ("WALL" || "BOX1")) {
            map[box2Index] = 0;
            map[playerIndex] = 0;

            box2Row -= 1
            box2Index = box2Row * gridCols + box2Col;
            map[box2Index] = 3;

            playerRow -= 1;
            playerIndex = playerRow * gridCols + playerCol;
            map[playerIndex] = 2;

            if (playerIndex - playerCol === target1Index ) {
                map[target1Index] = 5;
            }
            else if (playerIndex - playerCol === target2Index ) {
                map[target2Index] = 6;
            }
        }   
        else {
            map[playerIndex] = 0;

            playerRow -= 1;
            playerIndex = playerRow * gridCols + playerCol;
            map[playerIndex] = 2;

            if (playerIndex - playerCol === target1Index ) {
                map[target1Index] = 5;
            }
            else if (playerIndex - playerCol === target2Index ) {
                map[target2Index] = 6;
            }
        }
    }
})

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowDown" || event.key ==="s") {
        if (Types[map[playerIndex + gridCols]] === "WALL") {
            return;
        }
        else if (Types[map[playerIndex + gridCols]] === ("BOX1" || "BOX2") && Types[map[playerIndex + (2 * gridCols)]] === ("WALL" || "BOX1" || "BOX2")) {
            return;
        }
        else if (Types[map[playerIndex + gridCols]] === ("BOX1") && Types[map[playerIndex + (2 * gridCols)]] !== ("WALL" || "BOX2")) {
            map[box1Index] = 0;
            map[playerIndex] = 0;

            box1Row += 1
            box1Index = box1Row * gridCols + box1Col;
            map[box1Index] = 3;

            playerRow += 1;
            playerIndex = playerRow * gridCols + playerCol;
            map[playerIndex] = 2;
        }
        else if (Types[map[playerIndex + gridCols]] === ("BOX2") && Types[map[playerIndex + (2 * gridCols)]] !== ("WALL" || "BOX1")) {
            map[box2Index] = 0;
            map[playerIndex] = 0;

            box2Row += 1
            box2Index = box2Row * gridCols + box2Col;
            map[box2Index] = 3;

            playerRow += 1;
            playerIndex = playerRow * gridCols + playerCol;
            map[playerIndex] = 2;
        } 
        else {
        map[playerIndex] = 0;

        playerRow += 1;
        playerIndex = playerRow * gridCols + playerCol;

        map[playerIndex] = 2;
        }
    }
})

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft" || event.key ==="a") {
        if (Types[map[playerIndex - 1]] === "WALL") {
            return;
        }
        else if (Types[map[playerIndex - 1]] === ("BOX1" || "BOX2") && Types[map[playerIndex - 2]] === ("WALL" || "BOX1" || "BOX2")) {
            return;
        }
        else if (Types[map[playerIndex - 1]] === ("BOX1") && Types[map[playerIndex - 2]] !== ("WALL" || "BOX2")) {
            map[box1Index] = 0;
            map[playerIndex] = 0;

            box1Col -= 1
            box1Index = box1Row * gridCols + box1Col;
            map[box1Index] = 3;

            playerCol -= 1;
            playerIndex = playerRow * gridCols + playerCol;
            map[playerIndex] = 2;
        }
        else if (Types[map[playerIndex - 1]] === ("BOX2") && Types[map[playerIndex - 2]] !== ("WALL" || "BOX1")) {
            map[box2Index] = 0;
            map[playerIndex] = 0;

            box2Col -= 1
            box2Index = box2Row * gridCols + box2Col;
            map[box2Index] = 3;

            playerCol -= 1;
            playerIndex = playerRow * gridCols + playerCol;
            map[playerIndex] = 2;
        }
        else {
        map[playerIndex] = 0;

        playerCol -= 1;
        playerIndex = playerRow * gridCols + playerCol;

        map[playerIndex] = 2;
        }
    }
})

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowRight" || event.key ==="d") {
        if (Types[map[playerIndex + 1]] === "WALL") {
            return;
        }
        else if (Types[map[playerIndex + 1]] === ("BOX1" || "BOX2") && Types[map[playerIndex + 2]] === ("WALL" || "BOX1" || "BOX2")) {
            return;
        }
        else if (Types[map[playerIndex + 1]] === ("BOX1") && Types[map[playerIndex + 2]] !== ("WALL" || "BOX2")) {
            map[box1Index] = 0;
            map[playerIndex] = 0;

            box1Col += 1
            box1Index = box1Row * gridCols + box1Col;
            map[box1Index] = 3;

            playerCol += 1;
            playerIndex = playerRow * gridCols + playerCol;
            map[playerIndex] = 2;
        }
        else if (Types[map[playerIndex + 1]] === ("BOX2") && Types[map[playerIndex + 2]] !== ("WALL" || "BOX1")) {
            map[box2Index] = 0;
            map[playerIndex] = 0;

            box2Col += 1
            box2Index = box2Row * gridCols + box2Col;
            map[box2Index] = 3;

            playerCol += 1;
            playerIndex = playerRow * gridCols + playerCol;
            map[playerIndex] = 2;
        } 
        else {
        map[playerIndex] = 0;

        playerCol += 1;
        playerIndex = playerRow * gridCols + playerCol;

        map[playerIndex] = 2;
        }
    }
})




