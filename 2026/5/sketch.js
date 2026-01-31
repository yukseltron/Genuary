let letters = [];
let points = [];
let t = 0;
let hueVal; 
let minX = Infinity;
let maxX = -Infinity;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(2);
  
  colorMode(HSB, 360, 100, 100);
  noFill();

  
  let x = windowWidth / 2 - 600;
  const y = height / 2;
  const size = 200;
  const spacing = 175;

  letters.push(makeG(x, y, size)); x += spacing;
  letters.push(makeE(x, y, size)); x += spacing;
  letters.push(makeN(x, y, size)); x += spacing;
  letters.push(makeU(x, y, size)); x += spacing;
  letters.push(makeA(x, y, size)); x += spacing;
  letters.push(makeR(x, y, size)); x += spacing;
  letters.push(makeY(x, y, size));

  
  for (let letter of letters) {
    for (let seg of letter) {
      sampleSegment(seg[0], seg[1], 14);
    }
  }

  
  for (let p of points) {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
  }

  
  hueVal = random(0, 360);
}

function draw() {
  background(0);
  t += 0.01;

  for (let p of points) {
    let n = noise(p.x * 1, p.y * 1, t);
    let angle = n * TWO_PI * 2;

    let ox = cos(angle) * 10;
    let oy = sin(angle) * 2;

    
    let norm = 0.5;
    if (maxX > minX) norm = map(p.x, minX, maxX, 0, 1);

    
    let sat = 90;
    let bri = lerp(40, 100, norm);

    stroke(hueVal, sat, bri);
    strokeWeight(60);
    point(p.x + ox, p.y + oy);
  }
}



function makeG(x, y, s) {
  return [
    [[x, y - s/2], [x, y + s/2]],
    [[x, y - s/2], [x + s/2, y - s/2]],
    [[x, y + s/2], [x + s/2, y + s/2]],
    [[x + s/2, y], [x + s/4, y]],
    [[x + s/2, y + s/2], [x + s/2, y]]
  ];
}

function makeE(x, y, s) {
  return [
    [[x, y - s/2], [x, y + s/2]],
    [[x, y - s/2], [x + s/2, y - s/2]],
    [[x, y], [x + s/3, y]],
    [[x, y + s/2], [x + s/2, y + s/2]]
  ];
}

function makeN(x, y, s) {
  return [
    [[x, y + s/2], [x, y - s/2]],
    [[x, y - s/2], [x + s/2, y + s/2]],
    [[x + s/2, y + s/2], [x + s/2, y - s/2]]
  ];
}

function makeU(x, y, s) {
  return [
    [[x, y - s/2], [x, y + s/3]],
    [[x + s/2, y - s/2], [x + s/2, y + s/3]],
    [[x, y + s/3], [x + s/2, y + s/3]]
  ];
}

function makeA(x, y, s) {
  return [
    [[x, y + s/2], [x + s/4, y - s/2]],
    [[x + s/4, y - s/2], [x + s/2, y + s/2]],
    [[x + s/8, y], [x + s/3, y]]
  ];
}

function makeR(x, y, s) {
  return [
    [[x, y + s/2], [x, y - s/2]],
    [[x, y - s/2], [x + s/3, y - s/2]],
    [[x + s/3, y - s/2], [x + s/3, y]],
    [[x + s/3, y], [x, y]],
    [[x, y], [x + s/3, y + s/2]]
  ];
}

function makeY(x, y, s) {
  return [
    [[x, y - s/2], [x + s/4, y]],
    [[x + s/2, y - s/2], [x + s/4, y]],
    [[x + s/4, y], [x + s/4, y + s/2]]
  ];
}



function sampleSegment(a, b, count) {
  for (let i = 0; i <= count; i++) {
    let t = i / count;
    points.push({
      x: lerp(a[0], b[0], t),
      y: lerp(a[1], b[1], t)
    });
  }
}
