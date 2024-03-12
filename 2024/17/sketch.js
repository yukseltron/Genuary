let currentVertices = []; // Store current vertex positions
let targetVertices = []; // Store target (new) vertex positions

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 1);
  noFill();
  stroke('white');
  strokeWeight(1);
  frameRate(5); // Adjust frame rate as needed for the desired speed of change
  generateVertices(); // Generate initial vertices
}

function draw() {
  let t = frameCount * 0.01; // Use frameCount as a time variable for gradual changes

  let h = noise(t);
  let s = noise(t + 10);
  let b = noise(t + 20);

  background(h, s, b);

  let size = pow(2, int(random(8, 12)));
  let vert = int(random(1, 2)) * 4;
  let m1 = random(0.5, 3);
  let m2 = -m1 + random(-0.5, 0.5);

  // Update target (new) vertex positions
  targetVertices = [];
  for (let v = 0; v < vert; v++) {
    targetVertices.push({
      x: cos(TWO_PI / vert * v) * m1 * size,
      y: sin(TWO_PI / vert * v) * m1 * size
    });
    targetVertices.push({
      x: cos(TWO_PI / vert * (v + 0.5)) * m2 * size,
      y: sin(TWO_PI / vert * (v + 0.5)) * m2 * size
    });
  }

  let interpolationFactor = 0.05;

  // Animate vertices transformation
  for (let i = 0; i < currentVertices.length; i++) {
      currentVertices[i].x = lerp(currentVertices[i].x, targetVertices[i].x, interpolationFactor);
      currentVertices[i].y = lerp(currentVertices[i].y, targetVertices[i].y, interpolationFactor);
  }

  // Draw shapes with animated vertices
  for (let x = 0; x < width; x += size) {
    for (let y = 0; y < height; y += size) {
      push();
      translate(x + size / 2, y + size / 2);

      beginShape();
      for (let i = 0; i < currentVertices.length; i++) {
        vertex(currentVertices[i].x, currentVertices[i].y);
      }
      endShape(CLOSE);
      pop();
    }
  }
}

// Function to generate initial vertices
function generateVertices() {
  currentVertices = [];
  let size = pow(2, int(random(6, 10)));
  let vert = int(random(1, 2)) * 4;
  let m1 = random(0.5, 3);
  let m2 = -m1 + random(-0.5, 0.5);

  for (let v = 0; v < vert; v++) {
    currentVertices.push({
      x: cos(TWO_PI / vert * v) * m1 * size,
      y: sin(TWO_PI / vert * v) * m1 * size
    });
    currentVertices.push({
      x: cos(TWO_PI / vert * (v + 0.5)) * m2 * size,
      y: sin(TWO_PI / vert * (v + 0.5)) * m2 * size
    });
  }
}
