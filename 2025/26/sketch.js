let colors = [];
let sizeX = 25;
let sizeY = 25;
let cols, rows;
const gray = 'black'
let gray2;

function setup() {
    createCanvas(500, 500);
    cols = width / sizeX;
    rows = height / sizeY; 
    frameRate(4);
    gray2 = color(random(0, 255), random(0, 255), random(0, 255));
    
    for (let x = 0; x < cols / 2; x++) {
        colors[x] = [];
        for (let y = 0; y < rows; y++) {
            colors[x][y] = random([gray, gray2]);
        }
    }
}

function draw() {
    
    for (let x = 0; x < cols / 2; x++) {
        for (let y = 0; y < rows; y++) {
            let currentColor = colors[x][y];
            if (currentColor === gray) {
                continue;
            }
            let targetR = red(currentColor) + random(-50, 50);
            let targetG = green(currentColor);
            let targetB = blue(currentColor);

            
            targetR = constrain(targetR, 10, 255);
            targetG = constrain(targetG, 10, 255);
            targetB = constrain(targetB, 10, 255);

            colors[x][y] = color(random([gray, gray2]));
        }
    }

    
    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            let symX = x < cols / 2 ? x : cols - x - 1; 
            fill(y % 2 === 0 ? gray : colors[symX][y]);
            noStroke();
            rect(x * sizeX, y * sizeY, sizeX, sizeY);
            fill(y % 5 === 0 ? colors[symX][y] : gray);
            rect(x * sizeX + 10, y * sizeY + 20, sizeX - 20, sizeY - 30);
            fill(y % 3 === 0 ? colors[symX][y] : gray);
            rect(x * sizeX + 20, y * sizeY - 10, sizeX - 40, sizeY - 10);
        }
    }
}