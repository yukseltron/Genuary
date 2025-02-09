let waves = [];
let cols;
let rows;
let t = 0;
let numWaves = 1; // Number of overlapping wave gradients

function setup() {
  createCanvas(500, 500);
  cols = width;
  rows = height;
  for (let i = 0; i < numWaves; i++) {
    waves.push(new Wave(i * 0.2));
  }
}

function draw() {
  background(0);
  for (let wave of waves) {
    wave.display();
  }
  t += 0.005; // Increment time for smooth color shifting
}

class Wave {
  constructor(offset) {
    this.offset = offset;
  }

  display() {
    for (let y = 0; y < rows; y += 5) {
      let n = noise(y * 0.01 + this.offset, t);
      let color1 = color(lerpColor(
        color(255 * noise(t + this.offset), 100, 255 * noise(t * 0.5 + this.offset)),
        color(100, 255 * noise(t * 0.3 + this.offset), 255),
        n
      ));
      let color2 = color(lerpColor(
        color(255, 100 * noise(t * 0.7 + this.offset), 100),
        color(50, 50, 255 * noise(t * 0.9 + this.offset)),
        n
      ));
      
      let inter = map(sin(y * 0.02 + t * 2 + this.offset * TWO_PI), -1, 1, 0, 1);
      let c = lerpColor(color1, color2, inter);
      stroke(c);
      strokeWeight(10);
      noFill();
      ellipse(width / 2, y, 100 + 50 * sin(y * 0.02 + t * 2 + this.offset * TWO_PI), 200, 200);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  cols = width;
  rows = height;
}
