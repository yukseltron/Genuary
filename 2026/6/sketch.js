let polarity = 1;
let z = 0;
let scale = 0.0006;

function setup() {
  createCanvas(600, 600);
  colorMode(RGB, 255);
  noStroke();
}

function draw() {
  z += 0.004;
  background(0, 30);

  for (let x = 0; x < width; x += 6) {
    for (let y = 0; y < height; y += 6) {
      let n = noise(x * scale, y * scale, z);
      let v = polarity === 1 ? n : 1 - n;

      let light = map(v, 0.4, 0.6, 0, 1, true);
      let c = lerp(30, 240, light);

      fill(c);
      rect(x, y, 6, 6);
    }
  }
}

function mousePressed() {
  polarity *= -1;
}
