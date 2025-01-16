let circles = [];
let i = 0;
let x = 0;
let y = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  frameRate(100);
  
  // Create 10,000 circles
  for (let i = 0; i < 1000000; i++) {
    circles.push({
      x: random(width),
      y: random(height),
      size: random(10),
      color: color(random(100,255), random(255), random(255)),
      noiseOffsetX: random(1000),
      noiseOffsetY: random(1000)
    });
  }
}

function draw() {

    let circle = circles[i];
    

    // Draw the circle
    fill('blue');
    text(i, x, y);
    

    if (i <= circles.length) {
        i += 1;
    }

    if (x <= width) {
        x += random(5);
    } else {
        x = 0;
    }

    if (y <= height) {
        y += random(5);
    } else {
        y = 0;
    }
  
}
