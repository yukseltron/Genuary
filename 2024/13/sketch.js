let t = 0.0;
let strokeCounter = [];
let randomRed = [];
let randomGreen = [];
let randomAlpha = [];
let points = [
  {
    a: Math.random() * 10,
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
    a: Math.random() * 10,
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
    a: Math.random() * 10,
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
  background('black');
  for (let i = 0; i < 3; i++) {
    strokeCounter.push(0.1);
    randomRed.push(random(100, 255));
    randomGreen.push(random(100, 250));
    randomAlpha.push(random(10, 250));
  }
}

function draw() {
  //background('darkgreen');
  translate(width / 2, height / 2);
  noFill();

  for (let i = 0; i < points.length; i++) {
    beginShape();
    rotate(t * i + 0.5 / 2.434);
    strokeWeight(strokeCounter[i]);
    stroke(10*strokeCounter[i], randomRed[i], randomGreen[i], randomAlpha[i]);
  
    if (strokeCounter[i] >= 10) {
      strokeCounter[i] = 10;
      //background('black');
    }
    else
      strokeCounter[i] += 0.1;
    for (let x = -width / 2; x < width / 2; x += 100) {
      let y = (sin(points[i].a * x + t + points[i].b + points[i].c * sin(points[i].d * x + points[i].e * t + points[i].f) * points[i].g) * points[i].h) ** 3/4;
      curveVertex(x, y);
    }
    endShape();
  }

  t += 0.002;
}
