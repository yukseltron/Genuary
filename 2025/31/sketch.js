let colors = [];
let sizeX = 5;
let sizeY = 5;
let cols, rows;
const gray = 'orangered';

function setup() {
    createCanvas(500, 500);
    cols = width / sizeX;
    rows = height / sizeY;
    frameRate(8);
    
    for (let x = 0; x < cols; x++) {
        colors[x] = [];
        for (let y = 0; y < rows; y++) {
            colors[x][y] = random(['black','blue']);
        }
    }
}

function draw() {
    background(0);
    
    let glitchX = floor(random(cols));
    let glitchY = floor(random(rows));
    let glitchWidth = floor(random(3, 10));
    let glitchHeight = floor(random(3, 10));
    
    // Sort a random horizontal strip
    let ySort = floor(random(rows));
    colors.sort((a, b) => brightness(a[ySort]) - brightness(b[ySort]));
    
    // Apply the glitch effect
    for (let x = glitchX; x < min(glitchX + glitchWidth, cols); x++) {
        for (let y = glitchY; y < min(glitchY + glitchHeight, rows); y++) {
            colors[x][y] = random(['lime']);
        }
    }
    
    // Draw the grid
    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            noStroke();
            fill(colors[x][y]);
            rect(x * sizeX, y * sizeY, sizeX, sizeY);
        }
    }
}
