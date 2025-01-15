let colors = []; 
let sizeX = 50;
let sizeY = 50;
let cols, rows;
const gray = 'white'

function setup() {
    createCanvas(500, 500);
    cols = width / sizeX; 
    rows = height / sizeY; 
    frameRate(4);

    
    for (let x = 0; x < cols / 2; x++) {
        colors[x] = [];
        for (let y = 0; y < rows; y++) {
            colors[x][y] = random([gray, 'blue',]);
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

            colors[x][y] = color(random(['blue', gray]));

        }
    }

    
    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            let symX = x < cols / 2 ? x : cols - x - 1; 
            fill(colors[symX][y]);
            stroke('blue');
            rect(x * sizeX, y * sizeY, sizeX, sizeY);
            sizeX -= 0.01;
            sizeY -= 0.01;
        }
    }
}