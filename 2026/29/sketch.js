let cells = [];
let initialCount = 3;
let baseHue; 

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  baseHue = random(500);
  cells = []; 
  
  for (let i = 0; i < initialCount; i++) {
    cells.push(new Cell(random(width), random(height)));
  }
}

function draw() {
  background(10); 

  for (let i = 0; i < cells.length; i++) {
    cells[i].update();
    cells[i].display();
    cells[i].checkEdges();
    
    for (let j = i + 1; j < cells.length; j++) {
      cells[i].interact(cells[j]);
    }
  }
}

class Cell {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(0.5, 2)); 
    this.baseHue = baseHue; 
    this.baseSizeMult = 0.4;
    this.basePulseSpeed = 2;
    this.baseDashOn = [60, 50];
    this.baseDashOff = [60, 50];
    this.baseUseDash = true;
    this.baseMainBlobWeight = random(10, 50);
    this.baseInnerDetailWeight = random(5, 20);
    this.baseNucleusWeight = 60;
    this.baseOrganelle1Weight = random(5, 15);
    this.baseOrganelle2Weight = random(5, 15);
    this.ageCounter = 0;
    this.spikiness = 0; 
    this.sizeVariance = 0; 
    this.aspectRatioX = 1; 
    this.aspectRatioY = 1; 
    this.hueShift = 0; 
    this.weightVariance = 0; 
    this.organelleCount = 2; 
    
    this.organelleOffsets = [
      createVector(random(-15, 15), random(-15, 15)),
      createVector(random(-15, 15), random(-15, 15))
    ];

    this.phase = random(1000);
    this.zoff = random(1000);
    this.breathing = random(1000);
  }

  update() {
    this.pos.add(this.vel);
    this.phase += 0.3;
    this.zoff += 0.01;
    this.breathing += this.basePulseSpeed;
    this.ageCounter++;
    this.spikiness = sin(this.ageCounter * 0.05) * 0.8; 
    this.sizeVariance = sin(this.ageCounter * 0.03) * 0.2; 
    this.aspectRatioX = 1 + sin(this.ageCounter * 0.04) * 0.4; 
    this.aspectRatioY = 1 + cos(this.ageCounter * 0.035) * 0.4; 
    this.hueShift = (this.ageCounter * 0.1) % 360; 
    this.weightVariance = sin(this.ageCounter * 0.06) * 3; 
    
    this.organelleCount = 2 + floor(this.ageCounter / 1000); 
    if (this.organelleCount > this.organelleOffsets.length) {
      this.organelleOffsets.push(createVector(random(-15, 15), random(-15, 15)));
    }
  }

  interact(other) {
    let distThreshold = 100 * this.sizeMult;
    let d = p5.Vector.dist(this.pos, other.pos);
    if (d < distThreshold) {
      let force = p5.Vector.sub(this.pos, other.pos);
      force.setMag(0.1); 
      this.vel.add(force);
      this.vel.limit(2); 
    }
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    colorMode(HSB);
    
    let currentHue = (this.baseHue + this.hueShift) % 360;
    let currentSize = this.baseSizeMult + this.sizeVariance;
    let nm = 10 + this.spikiness; 
    
    stroke(currentHue, 100, 100);
    strokeWeight(this.baseMainBlobWeight + this.weightVariance);
    this.renderWobble(nm, currentSize * this.aspectRatioX * this.aspectRatioY, this.baseUseDash, color(currentHue, 80, 80, 0.6));
    
    stroke((currentHue + 180) % 360, 60, 100);
    strokeWeight(this.baseInnerDetailWeight + this.weightVariance);
    this.renderWobble(1.2, currentSize * 0.7 * this.aspectRatioX * this.aspectRatioY, !this.baseUseDash, null);

    stroke(currentHue, 100, 100);
    strokeWeight(this.baseNucleusWeight + this.weightVariance);
    this.renderWobble(0.8, currentSize * 0.4 * this.aspectRatioX * this.aspectRatioY, this.baseUseDash, color(currentHue, 80, 80, 0.8));

    
    for (let i = 0; i < this.organelleCount; i++) {
      push();
      translate(this.organelleOffsets[i].x, this.organelleOffsets[i].y);
      stroke((currentHue + 90 + i * 90) % 360, 80, 100);
      let organelleWeight = (i === 0 ? this.baseOrganelle1Weight : this.baseOrganelle2Weight) + this.weightVariance;
      strokeWeight(organelleWeight);
      let organelleNm = 0.5 - (i * 0.2); 
      this.renderWobble(organelleNm, currentSize * (0.2 - i * 0.05) * this.aspectRatioX * this.aspectRatioY, !this.baseUseDash, null);
      pop();
    }
    pop();
  }

  renderWobble(nm, v, dashed, fillC) {
    push();
    noFill();

    if (dashed) drawingContext.setLineDash(this.baseDashOn);
    else drawingContext.setLineDash([]);

    beginShape();
    for (let a = 0; a < 360; a += 15) { 
      let xoff = map(cos(a + this.phase), -1, 1, 0, nm);
      let yoff = map(sin(a + this.phase), -1, 1, 0, nm);
      let r = map(noise(xoff, yoff, this.zoff), 0, 1, 40, 90);
      let bulgePattern = abs(sin(a * 0.5 + this.ageCounter * 0.02)) * 100; 
      r += bulgePattern;
      let bModX = (sin(0.185 * this.breathing) + 2);
      let bModY = (sin(0.185 * this.breathing) + 3);
      let x = r * cos(a) * v * bModX;
      let y = r * sin(a) * v * bModY;
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }

  checkEdges() {
    if (this.pos.x < 50 || this.pos.x > width - 50) this.vel.x *= -1;
    if (this.pos.y < 50 || this.pos.y > height - 50) this.vel.y *= -1;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}