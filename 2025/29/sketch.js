let colors = [];
let sizeX = 20;
let sizeY = 20;
let cols, rows;
const gray = 'orangered';

function setup() {
    createCanvas(500, 500);
    cols = width / sizeX;
    rows = height / sizeY; 
    frameRate(4);

    
    for (let x = 0; x < cols / 2; x++) {
        colors[x] = [];
        for (let y = 0; y < rows; y++) {
            colors[x][y] = random([gray, 'black']);
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

            colors[x][y] = color(random(['black', gray]));
        }
    }

    
    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            let symX = x < cols / 2 ? x : cols - x - 1;
            let offsetX = random([1,2,3,4,5,6,7,8,9,10]);
            let offsetY = random([1,2,3,4,5,6,7,8,9,10]);
            noStroke(); 
            fill(colors[symX][y]);
            rect(x * sizeX, y * sizeY, sizeX, sizeY);
            let randomX = Math.round(random(cols/offsetX));
            let randomY = Math.round(random(rows/offsetY));
            fill('lime');
            rect(randomX * sizeX, randomY * sizeY, sizeX, sizeY);

            let randomX2 = Math.round(random(cols));
            let randomY2 = Math.round(random(rows));
            fill('blue');
            rect(randomX2 * sizeX, randomY2 * sizeY, sizeX, sizeY);
        }
    }
}