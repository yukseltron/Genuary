//draw 1 million little dots of various colors and have them animated by "smearing" them in a random direction
//

let dots = [];
let dotCount = 1000;

function setup() {
    createCanvas(800, 800);
    angleMode(DEGREES);
    noStroke();
    for (let i = 0; i < dotCount; i++) {
        dots.push({ x: random(width), y: random(height), color: color(random(255), random(255), random(255), 100) });
    }
}

function draw() {
    background('white');
    for (let dot of dots) {
        let angle = random(360);
        let distance = random(10);
        let dx = cos(angle) * distance;
        let dy = sin(angle) * distance;
        dot.x += dx;
        dot.y += dy;
        dot.x = constrain(dot.x, 0, width);
        dot.y = constrain(dot.y, 0, height);
        fill(dot.color);
        ellipse(dot.x, dot.y, 1);
    }
}

