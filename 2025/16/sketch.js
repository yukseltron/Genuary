let t = 0.0;
let strokeCounter = [1];
let randomRed = [];
let randomGreen = [];
let randomAlpha = [];
let points = [
  {
    a: Math.random() * 10,
    b: Math.random() * 10,
    c: Math.random() * 10,
    //inner
    d: 10.15,
    e: 1.5,
    f: 2.5,
    g: 1,
    h: 10,
  },
]

function setup() {
  createCanvas(windowWidth/2, windowHeight/2);
  background('black');
}

function draw() {
  translate(width / 2, height / 2);
  noFill();

if (frameCount % 120 == 0 || frameCount === 1) { // Change colors every 120 frames (approximately every 2 seconds at 60 FPS)
    randomRed = [];
    randomGreen = [];
    randomAlpha = [];
    for (let i = 0; i < 3; i++) {
        randomRed.push(random(0, 255));
        randomGreen.push(random(0, 250));
        randomAlpha.push(100);
    }
}

  for (let i = 0; i < points.length; i++) {
    beginShape();
    rotate(t * i + 0.5 / 2.434);
    strokeWeight(strokeCounter[i]);
    stroke(10*strokeCounter[i], randomRed[i], randomGreen[i], randomAlpha[i]);
  
    // if (strokeCounter[i] >= 10) {
    //   strokeCounter[i] = 10;
    //   //background('black');
    // }
    // else
    //   strokeCounter[i] += 0.1;
    for (let x = -width / 2; x < width / 2; x += 100) {
      let y = (sin(points[i].a * x + t + points[i].b + points[i].c * sin(points[i].d * x + points[i].e * t + points[i].f) * points[i].g) * points[i].h) ** 3/4;
      curveVertex(x, y);
    }
    endShape();
  }

  t += 0.002;
}
