let colors = []; // 2D array for storing colors
let sizeX = 20;
let sizeY = 20;
let cols, rows;
const gray = 'black'

function setup() {
    createCanvas(500, 500);
    cols = width / sizeX; // Number of columns
    rows = height / sizeY; // Number of rows
    frameRate(4);

    // Initialize colors
    for (let x = 0; x < cols / 2; x++) {
        colors[x] = [];
        for (let y = 0; y < rows; y++) {
            colors[x][y] = random([gray, 'white',]);
        }
    }
}

function draw() {
    // Gradually transition colors
    for (let x = 0; x < cols / 2; x++) {
        for (let y = 0; y < rows; y++) {
            let currentColor = colors[x][y];
            if (currentColor === gray) {
                continue;
            }
            let targetR = red(currentColor) + random(-50, 50);
            let targetG = green(currentColor);
            let targetB = blue(currentColor);

            // Ensure RGB values stay within bounds
            targetR = constrain(targetR, 10, 255);
            targetG = constrain(targetG, 10, 255);
            targetB = constrain(targetB, 10, 255);

            colors[x][y] = color(random(['white', gray]));
        }
    }

    // Draw the grid with symmetry
    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            let symX = x < cols / 2 ? x : cols - x - 1; // Reflect horizontally
            noFill();
            stroke(colors[symX][y]);
            rect(x * sizeX, y * sizeY, sizeX, sizeY);
        }
    }
}