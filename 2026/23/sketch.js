let blobs = [];
const BLOB_COUNT = 6;

function setup() {
  createCanvas(600, 600);
  blendMode(SCREEN);
  
  for (let i = 0; i < BLOB_COUNT; i++) {
    blobs.push(new MorphBlob());
  }
  background(5, 10, 20);
}

function draw() {
  blendMode(BLEND);
  background(5, 10, 20, 30); 
  blendMode(SCREEN);
  for (let b of blobs) {
    b.update();
    b.display();
  }
}

class MorphBlob {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(random(-0.5, 0.5), random(-0.5, 0.5));
    this.baseRadius = random(100, 250);
    this.noiseScale = random(0.2, 0.5);
    this.seed = random(1000);
    
    this.color = color(
      random(0, 255), 
      random(0, 255), 
      255, 
      20 
    );
  }

  update() {
    this.pos.add(this.vel);
    
    if (this.pos.x < -this.baseRadius) this.pos.x = width + this.baseRadius;
    if (this.pos.x > width + this.baseRadius) this.pos.x = -this.baseRadius;
    if (this.pos.y < -this.baseRadius) this.pos.y = height + this.baseRadius;
    if (this.pos.y > height + this.baseRadius) this.pos.y = -this.baseRadius;
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(this.color);
    beginShape();
    
    for (let a = 0; a < TWO_PI; a += 0.2) {
      let xoff = map(cos(a), -1, 1, 0, this.noiseScale);
      let yoff = map(sin(a), -1, 1, 0, this.noiseScale);
      let t = frameCount * 0.01;
      let r = this.baseRadius + map(noise(xoff + this.seed, yoff + t), 0, 1, -500, 500);
      let x = r * cos(a);
      let y = r * sin(a);
      
      curveVertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}