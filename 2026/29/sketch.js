let cells = [];
let initialCount = 3;
let baseHue; // Shared hue for all cells

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  // Set a random base hue that all cells will share
  baseHue = random(500);
  // Re-initializing the array to ensure it's fresh
  cells = []; 
  
  for (let i = 0; i < initialCount; i++) {
    cells.push(new Cell(random(width), random(height)));
  }
}

function draw() {
  background(10); // Darker background to make colors pop

  for (let i = 0; i < cells.length; i++) {
    cells[i].update();
    cells[i].display();
    cells[i].checkEdges();
    
    // Minimal Collision: Subtle push away from neighbors
    for (let j = i + 1; j < cells.length; j++) {
      cells[i].interact(cells[j]);
    }
  }
}

class Cell {
  constructor(x, y) {
    this.pos = createVector(x, y);
    // Movement: Ensuring velocity is actually applied
    this.vel = p5.Vector.random2D().mult(random(0.5, 2)); 
    
    // Base properties - all cells start similar with shared color
    this.baseHue = baseHue; // Use shared hue from setup
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

    // Evolution/variance properties
    this.ageCounter = 0;
    this.spikiness = 0; // -1 to 1, affects nm parameter
    this.sizeVariance = 0; // adds/subtracts from sizeMult
    this.aspectRatioX = 1; // wider/narrower
    this.aspectRatioY = 1; // taller/shorter
    this.hueShift = 0; // varies hue over time
    this.weightVariance = 0; // varies all stroke weights
    this.organelleCount = 2; // can add more organelles
    
    // Organelle positions - randomized once but evolved
    this.organelleOffsets = [
      createVector(random(-15, 15), random(-15, 15)),
      createVector(random(-15, 15), random(-15, 15))
    ];

    // Animation states
    this.phase = random(1000);
    this.zoff = random(1000);
    this.breathing = random(1000);
  }

  update() {
    // Apply movement
    this.pos.add(this.vel);
    
    // Increment animation
    this.phase += 0.3;
    this.zoff += 0.01;
    this.breathing += this.basePulseSpeed;
    
    // Evolution over time
    this.ageCounter++;
    
    // Slowly evolve properties using noise for smooth changes
    this.spikiness = sin(this.ageCounter * 0.05) * 0.8; // -0.8 to 0.8
    this.sizeVariance = sin(this.ageCounter * 0.03) * 0.2; // varies size
    this.aspectRatioX = 1 + sin(this.ageCounter * 0.04) * 0.4; // 0.6 to 1.4
    this.aspectRatioY = 1 + cos(this.ageCounter * 0.035) * 0.4; // 0.6 to 1.4
    this.hueShift = (this.ageCounter * 0.1) % 360; // slowly rotate hue
    this.weightVariance = sin(this.ageCounter * 0.06) * 3; // ±3 weight variance
    
    // Organelles can be added after certain time
    this.organelleCount = 2 + floor(this.ageCounter / 1000); // adds new organelle every 3000 frames
    if (this.organelleCount > this.organelleOffsets.length) {
      this.organelleOffsets.push(createVector(random(-15, 15), random(-15, 15)));
    }
  }

  // Soft collision detection (Separation)
  interact(other) {
    let distThreshold = 100 * this.sizeMult;
    let d = p5.Vector.dist(this.pos, other.pos);
    if (d < distThreshold) {
      let force = p5.Vector.sub(this.pos, other.pos);
      force.setMag(0.1); // Gentle push
      this.vel.add(force);
      this.vel.limit(2); // Keep speed under control
    }
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    colorMode(HSB);
    
    // Calculate evolved properties
    let currentHue = (this.baseHue + this.hueShift) % 360;
    let currentSize = this.baseSizeMult + this.sizeVariance;
    let nm = 10 + this.spikiness; // affects spikiness (1.5 - 2.3)
    
    // Style DNA
    stroke(currentHue, 100, 100);
    strokeWeight(this.baseMainBlobWeight + this.weightVariance);
    
    // Main Blob
    this.renderWobble(nm, currentSize * this.aspectRatioX * this.aspectRatioY, this.baseUseDash, color(currentHue, 80, 80, 0.6));
    
    // Inner Detail (Opposite Hue)
    stroke((currentHue + 180) % 360, 60, 100);
    strokeWeight(this.baseInnerDetailWeight + this.weightVariance);
    this.renderWobble(1.2, currentSize * 0.7 * this.aspectRatioX * this.aspectRatioY, !this.baseUseDash, null);

    //nucleus
    stroke(currentHue, 100, 100);
    strokeWeight(this.baseNucleusWeight + this.weightVariance);
    this.renderWobble(0.8, currentSize * 0.4 * this.aspectRatioX * this.aspectRatioY, this.baseUseDash, color(currentHue, 80, 80, 0.8));

    //organelles
    for (let i = 0; i < this.organelleCount; i++) {
      push();
      translate(this.organelleOffsets[i].x, this.organelleOffsets[i].y);
      stroke((currentHue + 90 + i * 90) % 360, 80, 100);
      let organelleWeight = (i === 0 ? this.baseOrganelle1Weight : this.baseOrganelle2Weight) + this.weightVariance;
      strokeWeight(organelleWeight);
      let organelleNm = 0.5 - (i * 0.2); // varies by organelle index
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
    for (let a = 0; a < 360; a += 15) { // Faster rendering
      let xoff = map(cos(a + this.phase), -1, 1, 0, nm);
      let yoff = map(sin(a + this.phase), -1, 1, 0, nm);
      let r = map(noise(xoff, yoff, this.zoff), 0, 1, 40, 90);
      
      // Add directional bulges using angle
      let bulgePattern = abs(sin(a * 0.5 + this.ageCounter * 0.02)) * 100; // creates wave-like bulges
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