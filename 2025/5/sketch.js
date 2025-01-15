
let cubes = []; 
let gridSize = 40; 
let rows = 10;
let cols = 10;

function setup() {
    createCanvas(800, 800);
    angleMode(DEGREES);
    noStroke();

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            let xPos = (x - y) * gridSize * 0.866; 
            let yPos = (x + y) * gridSize * 0.5;  
            let h = random(0.5, 3) * gridSize;
            let speed = random(0.5, 2); 
            cubes.push({ x: xPos, y: yPos, h: h, speed: speed, direction: 1 });
        }
    }
}

function draw() {
    background('white');
    translate(width / 2, height / 2);

    for (let cube of cubes) {
        
        cube.h += cube.speed * cube.direction;
        if (cube.h > gridSize * 3 || cube.h < 0) {
            cube.direction *= -1; 
        }

        drawIsometricCube(cube.x, cube.y, gridSize, cube.h);
    }
}

function drawIsometricCube(x, y, size, h) {
    push();
    translate(x, y);
    
    let topColor = 'white';
    let sideColor1 = 'white';
    let sideColor2 = 'white';
    
    fill(topColor);
    stroke('black');
    quad(0, -h, size * 0.866, -h - size * 0.5, 0, -h - size, -size * 0.866, -h - size * 0.5);
    
    fill(sideColor1);
    stroke('black');
    quad(-size * 0.866, -size * 0.5, 0, 0, 0, -h, -size * 0.866, -h - size * 0.5);
    
    fill(sideColor2);
    stroke('black');
    quad(0, 0, size * 0.866, -size * 0.5, size * 0.866, -h - size * 0.5, 0, -h);

    pop();
}
