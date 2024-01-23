function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 1);
  noFill();
  strokeWeight(1);
  frameRate(3); // Adjust frame rate as needed for the desired speed of change
}

function draw() {
  let t = frameCount * 0.01; // Use frameCount as a time variable for gradual changes

  let h = noise(t);
  let s = noise(t + 10);
  let b = noise(t + 20);

  background(h, s, b);

  let strokeH = (h + 0.5) % 1;
  let strokeS = (s + 0.5) % 1;
  let strokeB = (b + 0.5) % 1;

  stroke(strokeH, strokeS, strokeB, 5);

  let size = pow(2, int(random(6, 10)));
  let vert = int(random(1, 2)) * 4;
  let m1 = random(0.5, 3);
  let m2 = -m1 + random(-0.5, 0.5);

  for (let x = 0; x < width; x += size) {
    for (let y = 0; y < height; y += size) {
      push();
      translate(x + size / 2, y + size / 2);

      beginShape();
      let a = TWO_PI / vert;
      for (let v = 0; v < vert; v++) {
        vertex(cos(a * v) * m1 * size, sin(a * v) * m1 * size);
        vertex(cos(a * (v + 0.5)) * m2 * size, sin(a * (v + 0.5)) * m2 * size);
      }
      endShape(CLOSE);
      pop();
    }
  }
}
