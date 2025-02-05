let colors = [];
let sizeX, sizeY;
let cols, rows;
const gray = 'beige';

function setup() {
    createCanvas(500, 800);

    sizeX = width / 30;
    sizeY = height / 30;

    cols = floor(width / sizeX);
    rows = floor(height / sizeY);

    frameRate(3);

    // Store colors for only a quarter of the canvas
    for (let x = 0; x < cols / 2; x++) {
        colors[x] = [];
        for (let y = 0; y < rows / 2; y++) {
            colors[x][y] = random([gray, 'maroon', 'green']);
        }
    }
}

function draw() {
    for (let x = 0; x < cols / 2; x++) {
        for (let y = 0; y < rows / 2; y++) {
            let currentColor = colors[x][y];

            if (currentColor === gray || currentColor === 'orangered' || currentColor === 'beige') {
                if (random() < 1 / TAU) {
                    colors[x][y] = random(['red', 'maroon', 'green']);
                }
            } else if (currentColor === 'red' || currentColor === 'green' || currentColor === 'maroon') {
                if (random() < 1 / TAU) {
                    colors[x][y] = random([gray, 'maroon', 'green', 'orangered']);
                }
            }
        }
    }

    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            let symX = x < cols / 2 ? x : cols - x - 1;  // Horizontal symmetry
            let symY = y < rows / 2 ? y : rows - y - 1;  // Vertical symmetry
            fill(colors[symX][symY]);
            noStroke();
            rect(x * sizeX, y * sizeY, sizeX, sizeY);
        }
    }
}
