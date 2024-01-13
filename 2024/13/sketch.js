let t = 0.0;
let strokeCounter = [];
let randomRed = [];
let randomGreen = [];
let points = [
  {
    a: 10,
    b: 5.6,
    c: 2,
    //inner
    d: 10.15,
    e: 1.5,
    f: 2.5,
    g: 1,
    h: 10,
  },
  {
    a: 12,
    b: 5.6,
    c: 2,
    //inner
    d: 10.15,
    e: 1.5,
    f: 2.5,
    g: 1,
    h: 10,
  },
  {
    a: 9,
    b: 5.6,
    c: 2,
    //inner
    d: 10.15,
    e: 1.5,
    f: 2.5,
    g: 1,
    h: 10,
  },
]

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('beige');
  for (let i = 0; i < 3; i++) {
    strokeCounter.push(0.1);
    randomRed.push(random(20, 255));
    randomGreen.push(random(100, 250));
  }
}

function draw() {
  //background('darkgreen');
  translate(width / 2, height / 2);
  noFill();

  for (let i = 0; i < points.length; i++) {
    beginShape();
    strokeWeight(strokeCounter[i]);
    stroke(10+strokeCounter[i], randomRed[i], randomGreen[i]);
  
    if (strokeCounter[i] >= 50) {
      strokeCounter[i] = 0.00001;
      background('beige');
    }
    else
      strokeCounter[i] += 0.1;
    for (let x = -width / 2; x < width / 2; x += 100) {
      let y = (sin(points[i].a * x + t + points[i].b + points[i].c * sin(points[i].d * x + points[i].e * t + points[i].f) * points[i].g) * points[i].h) ** 3;
      curveVertex(x, y);
    }
    endShape();
  }

  t += 0.002;
}
