let colors = []; // 2D array for storing colors
let sizeX = 20;
let sizeY = 20;
let cols;
let rows;
const gray = 'rgb(210, 210, 210)'

function setup() {
    createCanvas(500, 500);
    cols = width / sizeX; // Number of columns
    rows = height / sizeY; // Number of rows
    frameRate(4);

    for (let x = 0; x < cols / 2; x++) {
        colors[x] = [];
        for (let y = 0; y < rows; y++) {
            colors[x][y] = random([gray, 'black',]);
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
            colors[x][y] = color(random(['black', gray]));
        }
    }

    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            let symX = x < cols / 2 ? x : cols - x - 1; // Reflect horizontally
            fill(colors[symX][y]);
            noStroke();
            ellipse(x * sizeX, y * sizeY, sizeX);
            rect(x * sizeX, y * sizeY, sizeX, sizeY);
        }
    }
}