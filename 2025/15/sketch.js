let colors = [];
let sizeX, sizeY;
let cols, rows;
const gray = 'beige';

function setup() {
    createCanvas(500, 500); // Canvas size based on TAU

    sizeX = width / 10;
    sizeY = height / 10;

    cols = floor(width / sizeX); // Number of columns
    rows = floor(height / sizeY); // Number of rows

    frameRate(3); // Frame rate based on TAU

    for (let x = 0; x < cols / 2; x++) {
        colors[x] = [];
        for (let y = 0; y < rows; y++) {
            colors[x][y] = random([gray, 'maroon', 'green']); // Random initial colors
        }
    }
}

function draw() {
    for (let x = 0; x < cols / 2; x++) {
        for (let y = 0; y < rows; y++) {
            let currentColor = colors[x][y];
            
            if (currentColor === gray || currentColor === 'orange' || currentColor === 'white') {
                // Randomly turn white cells to red with a small probability
                if (random() < 1 / TAU) {
                    colors[x][y] = random(['red', 'maroon', 'green']);
                }
            } else if (currentColor === 'red' || currentColor === 'green' || currentColor === 'maroon') {
                // Keep red cells or turn them white with a small probability
                if (random() < 1 / TAU) {
                    colors[x][y] = random([gray, 'maroon', 'green', 'orange']);
                }
            }
        }
    }

    const shape = random([0, 1]);
    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            let symX = x < cols / 2 ? x : cols - x - 1; // Symmetrical x-coordinate
            fill(colors[symX][y]);
            noStroke();
            if (shape === 0) {
                rect(x * sizeX, y * sizeY, sizeX, sizeY); // Draw the cell
            } else {
                ellipse(x * sizeX + sizeX / 2, y * sizeY + sizeY / 2, sizeX, sizeY);
            }
        }
    }
}
