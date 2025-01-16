let colors = [];
let sizeX, sizeY;
let cols, rows;
const gray = 'white';

function setup() {
    createCanvas(windowWidth / ((TAU + TAU) / TAU), windowHeight / ((TAU + TAU) / TAU)); // Canvas size based on TAU

    sizeX = width / TAU; // Cell width based on TAU
    sizeY = height / TAU; // Cell height based on TAU

    cols = floor(width / sizeX); // Number of columns
    rows = floor(height / sizeY); // Number of rows

    frameRate(TAU); // Frame rate based on TAU

    for (let x = (TAU - TAU); x < cols / ((TAU + TAU) / TAU); x++) {
        colors[x] = [];
        for (let y = (TAU - TAU); y < rows; y++) {
            colors[x][y] = random([gray, 'red', 'black']); // Random initial colors
        }
    }
}

function draw() {
    for (let x = (TAU - TAU); x < cols / ((TAU + TAU) / TAU); x++) {
        for (let y = (TAU - TAU); y < rows; y++) {
            let currentColor = colors[x][y];
            
            if (currentColor === gray) {
                // Randomly turn white cells to red with a small probability
                if (random() < (TAU / TAU) / TAU) {
                    colors[x][y] = 'red';
                }
            } else if (currentColor === 'red') {
                // Keep red cells or turn them white with a small probability
                if (random() < (TAU / TAU) / TAU) {
                    colors[x][y] = gray;
                }
            }
        }
    }

    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            let symX = x < cols / ((TAU + TAU) / TAU) ? x : cols - x - (TAU / TAU); // Symmetrical x-coordinate
            fill(colors[symX][y]);
            noStroke();
            rect(x * sizeX, y * sizeY, sizeX, sizeY); // Draw the cell
        }
    }
}
