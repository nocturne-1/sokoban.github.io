const canvas = document.getElementById("sokobanCanvas");
const ctx = canvas.getContext("2d");

const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");

let gameRunning = false;

let gameWon;

startButton.addEventListener("click", () => {
    gameRunning = true;
    window.requestAnimationFrame(updateAll);

})

resetButton.addEventListener("click", () => {
    gameRunning = false;    
    window.location.reload();
        
});

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

const maps = [
    //Level 1
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
    0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 1, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 
    0, 0, 0, 1, 0, 2, 0, 4, 0, 5, 1, 1, 0, 0, 0, 
    0, 0, 0, 1, 0, 0, 0, 6, 0, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //Level 2
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 
    0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0,
    0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 1, 0, 0, 0, 4, 0, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 1, 0, 5, 0, 0, 0, 6, 0, 1, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]

]

let map;
let currentLevel = 0;

const updateAll = () => {
    if (!gameRunning) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    mapIndices();
    drawMap();

    if (
        (box1Index === target1Index && box2Index === target2Index) || 
        (box1Index === target2Index && box2Index === target1Index)
    ) {
        gameWon = true;
        gameRunning = false; 
        winScreen1();
        console.log(box1Index, box2Index, target1Index, target2Index);
        return;
    }
    
    window.requestAnimationFrame(updateAll);
}

function drawWall(x, y) {
    ctx.fillStyle = "#964B00";
    ctx.fillRect(x, y, 44, 11);
    ctx.fillRect(x+55, y, 11, 11);
    ctx.fillRect(x, y+22, 11, 11);
    ctx.fillRect(x+22, y+22, 44, 11);
    ctx.fillRect(x, y+44, 44, 11);
    ctx.fillRect(x+55, y+44, 11, 11);

    ctx.fillStyle = "#3B270C"
    ctx.fillRect(x+44, y, 11, 11)
    ctx.fillRect(x+11, y+22, 11, 11)
    ctx.fillRect(x+44, y + 44, 11, 11)

    let j = 0;
    while (j < 3) {
        ctx.fillStyle = "#3B270C";
        ctx.fillRect(x, y + ((2 * j * 11) + 11), tileW, 11);
        j++;
    }
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

let target1Index;
let target2Index;

function mapIndices() {
    if (currentLevel === 0) {
    target1Index = 69;
    target2Index = 82;
    } else {
    target1Index = 105;
    target2Index = 109;
    }
}


const drawMap = () => {
    for (let eachRow = 0; eachRow < gridRows; eachRow++) {
        for (let eachCol = 0; eachCol < gridCols; eachCol++) {
            map = maps[currentLevel];
            let arrayIndex = map[eachRow * gridCols + eachCol];
            let tileType = Types[arrayIndex];
            console.log(target1Index, target2Index);
            
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
        else if ((map[playerIndex - gridCols] === 3 || map[playerIndex - gridCols] === 4) && (map[playerIndex - (2 * gridCols)] === 1 || map[playerIndex - (2 * gridCols)] === 3 || map[playerIndex - (2 * gridCols)] === 4)) {
            return;
        }
        else if (map[playerIndex - gridCols] === 3 && (map[playerIndex - (2 * gridCols)] !== 1 && map[playerIndex - (2 * gridCols)] !== 4)) {
            map[box1Index] = 0;
            map[playerIndex] = 0;

            if (map[playerIndex + gridCols] === 1) {
                map[playerIndex + gridCols] = 0;
                map[playerIndex] = 1;
            }

            box1Row -= 1
            box1Index = box1Row * gridCols + box1Col;

            map[box1Index] = 3;

            playerRow -= 1;
            playerIndex = playerRow * gridCols + playerCol;
            map[playerIndex] = 2;

            if (playerIndex + gridCols === target1Index ) {
                map[target1Index] = 5;
            }
            else if (playerIndex + gridCols === target2Index ) {
                map[target2Index] = 6;
            }
        }
        else if (map[playerIndex - gridCols] === 4 && (map[playerIndex - (2 * gridCols)] !== 1 && map[playerIndex - (2 * gridCols)] !== 3)) {
            map[box2Index] = 0;
            map[playerIndex] = 0;

            if (map[playerIndex + gridCols] === 1) {
                map[playerIndex + gridCols] = 0;
                map[playerIndex] = 1;
            }

            box2Row -= 1
            box2Index = box2Row * gridCols + box2Col;
            map[box2Index] = 4;

            playerRow -= 1;
            playerIndex = playerRow * gridCols + playerCol;
            map[playerIndex] = 2;

            if (playerIndex + gridCols === target1Index ) {
                map[target1Index] = 5;
            }
            else if (playerIndex + gridCols === target2Index ) {
                map[target2Index] = 6;
            }
        }   
        else {
            map[playerIndex] = 0;

            if (map[playerIndex + gridCols] === 1) {
                map[playerIndex + gridCols] = 0;
                map[playerIndex] = 1;
            }

            playerRow -= 1;
            playerIndex = playerRow * gridCols + playerCol;
            map[playerIndex] = 2;

            if (playerIndex + gridCols === target1Index ) {
                map[target1Index] = 5;
            }
            else if (playerIndex + gridCols === target2Index ) {
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
        else if ((map[playerIndex + gridCols] === 3 || map[playerIndex + gridCols] === 4) && (map[playerIndex + (2 * gridCols)] === 1 || map[playerIndex + (2 * gridCols)] === 3 || map[playerIndex + (2 * gridCols)] === 4)) {
            return;
        }
        else if (map[playerIndex + gridCols] === 3 && (map[playerIndex + (2 * gridCols)] !== 1 && map[playerIndex + (2 * gridCols)] !== 4)) {
            map[box1Index] = 0;
            map[playerIndex] = 0;

            if (map[playerIndex - gridCols] === 1) {
                map[playerIndex - gridCols] = 0;
                map[playerIndex] = 1;
            }

            box1Row += 1
            box1Index = box1Row * gridCols + box1Col;
            map[box1Index] = 3;

            playerRow += 1;
            playerIndex = playerRow * gridCols + playerCol;

            map[playerIndex] = 2;

            if (playerIndex - gridCols === target1Index ) {
                map[target1Index] = 5;
            }
            else if (playerIndex - gridCols === target2Index ) {
                map[target2Index] = 6;
            }
        }
        else if (map[playerIndex + gridCols] === 4 && (map[playerIndex + (2 * gridCols)] !== 1 && map[playerIndex + (2 * gridCols)] !== 3)) {
            map[box2Index] = 0;
            map[playerIndex] = 0;

            if (map[playerIndex - gridCols] === 1) {
                map[playerIndex - gridCols] = 0;
                map[playerIndex] = 1;
            }

            box2Row += 1
            box2Index = box2Row * gridCols + box2Col;
            map[box2Index] = 4;

            playerRow += 1;
            playerIndex = playerRow * gridCols + playerCol;

            map[playerIndex] = 2;

            if (playerIndex - gridCols === target1Index ) {
                map[target1Index] = 5;
            }
            else if (playerIndex - gridCols === target2Index ) {
                map[target2Index] = 6;
            }
        } 
        else {
            map[playerIndex] = 0;

            if (map[playerIndex - gridCols] === 1) {
                map[playerIndex - gridCols] = 0;
                map[playerIndex] = 1;
            }

            playerRow += 1;
            playerIndex = playerRow * gridCols + playerCol;

            map[playerIndex] = 2;

            if (playerIndex - gridCols === target1Index ) {
                map[target1Index] = 5;
            }
            else if (playerIndex - gridCols === target2Index ) {
                map[target2Index] = 6;
            }
        }
    }
})

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft" || event.key ==="a") {
        if (Types[map[playerIndex - 1]] === "WALL") {
            return;
        }
        else if ((map[playerIndex - 1] === 3 || map[playerIndex - 1] === 4) && (map[playerIndex - 2] === 1 || map[playerIndex - 2] === 3 || map[playerIndex - 2] === 4)) {
            return;
        }
        else if (map[playerIndex - 1] === 3 && (map[playerIndex - 2] !== 1 && map[playerIndex - 2] !== 4)) {
            map[box1Index] = 0;
            map[playerIndex] = 0;

            if (map[playerIndex + 1] === 1) {
                map[playerIndex + 1] = 0;
                map[playerIndex] = 1;
            }

            box1Col -= 1
            box1Index = box1Row * gridCols + box1Col;
            map[box1Index] = 3;

            playerCol -= 1;
            playerIndex = playerRow * gridCols + playerCol;
            map[playerIndex] = 2;

            if (playerIndex + 1 === target1Index ) {
                map[target1Index] = 5;
            }
            else if (playerIndex + 1 === target2Index ) {
                map[target2Index] = 6;
            }
        }
        else if (map[playerIndex - 1] === 4 && (map[playerIndex - 2] !== 1 && map[playerIndex - 2] !== 3)) {
            map[box2Index] = 0;
            map[playerIndex] = 0;

            if (map[playerIndex + 1] === 1) {
                map[playerIndex + 1] = 0;
                map[playerIndex] = 1;
            }

            box2Col -= 1
            box2Index = box2Row * gridCols + box2Col;
            map[box2Index] = 4;

            playerCol -= 1;
            playerIndex = playerRow * gridCols + playerCol;
            map[playerIndex] = 2;

            if (playerIndex + 1 === target1Index ) {
                map[target1Index] = 5;
            }
            else if (playerIndex + 1 === target2Index ) {
                map[target2Index] = 6;
            }
        }
        else {
            map[playerIndex] = 0;

            if (map[playerIndex + 1] === 1) {
                map[playerIndex + 1] = 0;
                map[playerIndex] = 1;
            }

            playerCol -= 1;
            playerIndex = playerRow * gridCols + playerCol;

            map[playerIndex] = 2;

            if (playerIndex + 1 === target1Index ) {
                map[target1Index] = 5;
            }
            else if (playerIndex + 1 === target2Index ) {
                map[target2Index] = 6;
            }
        }
    }
})

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowRight" || event.key ==="d") {
        if (Types[map[playerIndex + 1]] === "WALL") {
            return;
        }
        else if ((map[playerIndex + 1] === 3 || map[playerIndex + 1] === 4) && (map[playerIndex + 2] === 1 || map[playerIndex + 2] === 3 || map[playerIndex + 2] === 4)) {
            return;
        }
        else if (map[playerIndex + 1] === 3 && (map[playerIndex + 2] !== 1 && map[playerIndex + 2] !== 4)) {
            map[box1Index] = 0;
            map[playerIndex] = 0;

            if (map[playerIndex - 1] === 1) {
                map[playerIndex - 1] = 0;
                map[playerIndex] = 1;
            }

            box1Col += 1
            box1Index = box1Row * gridCols + box1Col;
            map[box1Index] = 3;

            playerCol += 1;
            playerIndex = playerRow * gridCols + playerCol;
            map[playerIndex] = 2;

            if (playerIndex - 1 === target1Index ) {
                map[target1Index] = 5;
            }
            else if (playerIndex - 1 === target2Index ) {
                map[target2Index] = 6;
            }
        }
        else if (map[playerIndex + 1] === 4 && (map[playerIndex + 2] !== 1 && map[playerIndex + 2] !== 3)) {
            map[box2Index] = 0;
            map[playerIndex] = 0;

            if (map[playerIndex - 1] === 1) {
                map[playerIndex - 1] = 0;
                map[playerIndex] = 1;
            }

            box2Col += 1
            box2Index = box2Row * gridCols + box2Col;
            map[box2Index] = 4;

            playerCol += 1;
            playerIndex = playerRow * gridCols + playerCol;
            map[playerIndex] = 2;

            if (playerIndex - 1 === target1Index ) {
                map[target1Index] = 5;
            }
            else if (playerIndex - 1 === target2Index ) {
                map[target2Index] = 6;
            }
        } 
        else {
            map[playerIndex] = 0;

            if (map[playerIndex - 1] === 1) {
                map[playerIndex - 1] = 0;
                map[playerIndex] = 1;
            }

            playerCol += 1;
            playerIndex = playerRow * gridCols + playerCol;

            map[playerIndex] = 2;

            if (playerIndex - 1 === target1Index ) {
                map[target1Index] = 5;
            }
            else if (playerIndex - 1 === target2Index ) {
                map[target2Index] = 6;
            }
        }
    }
})

winScreen1 = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "50px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("You Win!", canvas.width / 2 - 100, canvas.height / 2);
    if (currentLevel < maps.length - 1) {
        ctx.fillText("Press Enter to Continue", canvas.width / 2 - 230, canvas.height / 2 + 75)
    }
    else {
        ctx.fillText("Game Complete!", canvas.width / 2 - 230, canvas.height / 2 + 75)
    }
    newLevel();
}

function newLevel() {
    if (currentLevel < maps.length - 1) {
        document.addEventListener("keydown", function handler(e) {
            if (e.key === "Enter") {
                currentLevel++;
                target1Index = 105;
                target2Index = 109;
                gameWon = false;
                gameRunning = true;
                map = maps[currentLevel];
                drawMap();
                window.requestAnimationFrame(updateAll);
            }
        }, { once: true });
    }
};
