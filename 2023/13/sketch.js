const NP  = 140;   
const NS  = 0.004; 
const LR  = 1000;  
const EPS = 2;     

let pts = [];
let t   = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);

  for (let i = 0; i < NP; i++) {
    pts.push({ x: random(width), y: random(height), loss: 0.5, hue: random(360) });
  }
}

function draw() {
  
  noStroke();
  fill(230, 25, 3, 14);
  rect(0, 0, width, height);

  t += 0.002;

  
  for (let p of pts) {
    let n0 = noise(p.x * NS, p.y * NS, t);
    let gx = (noise((p.x + EPS) * NS, p.y * NS, t) - n0) / EPS;
    let gy = (noise(p.x * NS, (p.y + EPS) * NS, t) - n0) / EPS;

    p.x   += -gx * LR + random(-0.45, 0.45);
    p.y   += -gy * LR + random(-0.45, 0.45);
    p.loss = n0;

    
    p.x = ((p.x % width)  + width)  % width;
    p.y = ((p.y % height) + height) % height;
  }

  
  noFill();
  for (let i = 0; i < NP; i++) {
    let a = pts[i];
    if (a.loss > 0.32) continue;          
    for (let j = i + 1; j < NP; j++) {
      let b = pts[j];
      if (b.loss > 0.32) continue;
      let d = dist(a.x, a.y, b.x, b.y);
      if (d > 78) continue;
      let avg   = (a.loss + b.loss) * 0.5;
      let alpha = map(d, 0, 78, 38, 0) * map(avg, 0, 0.32, 1, 0);
      let hue   = (a.hue + b.hue) / 2;
      stroke(hue, 55, 88, alpha);
      strokeWeight(0.5);
      line(a.x, a.y, b.x, b.y);
    }
  }

  
  noStroke();
  for (let p of pts) {
    let l   = p.loss;
    let sat = map(l, 0, 1, 78, 50);
    let bri = map(l, 0, 1, 96, 45);
    let sz  = map(l, 0, 1, 4.5, 1.5);
    let alp = map(l, 0, 1, 95, 38);

    
    if (l < 0.28) {
      let glow = map(l, 0, 0.28, 28, 0);
      fill(p.hue, 45, 100, glow);
      ellipse(p.x, p.y, sz * 5.5, sz * 5.5);
    }

    fill(p.hue, sat, bri, alp);
    ellipse(p.x, p.y, sz, sz);
  }
}

function mousePressed() {
  
  for (let p of pts) {
    p.x = random(width);
    p.y = random(height);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
