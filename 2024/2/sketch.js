let yOff = 0;
let noiseScale = 0.02;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  frameRate(6);
}

function draw() {
  background('pink');
  for (let y = 200; y < height; y += 10) {
    let hue = map(y, 0, height, 0, 360);
    let saturation = map(y, 0, height, 20, 100);
    let brightness = 100;

    stroke(hue, saturation, brightness);
    strokeWeight(random(1,5));
    for (let x = 0; x < width; x += 10) {
      point(x + random(width), y + noise(yOff));
    }

  }
}
