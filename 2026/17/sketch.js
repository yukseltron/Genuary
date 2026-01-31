let t = 0;
let groupType = 0;
let colors = [];
let angled;

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100, 1);
  generateColors();
  noStroke();
  angled = random(0.01, 4)
}

function draw() {
  background(0);
  t += 0.01;
  
  if (frameCount % 300 === 0) {
    groupType = (groupType + 1) % 4;
    generateColors();
  }

  let size = 100;
  let cols = width / size + 2;
  let rows = height / size + 2;

  for (let i = -1; i < cols; i++) {
    for (let j = -1; j < rows; j++) {
      push();
      translate(i * size, j * size);
      applyWallpaperGroup(groupType, size);
      drawPatternCell(size);
      pop();
    }
  }
}

function applyWallpaperGroup(type, s) {
  if (type === 1) {
      let angle = map(sin(t), -1, 1, 0, PI/3);
      rotate(angle);
  } else if (type === 2) {
    shearX(PI/4 * sin(t)); 
  }
}

function drawPatternCell(s) {
  push();
  translate(s / 2, s / 2);
  
  let layers = 5;
  let points = floor(map(sin(t * 0.5), -1, 1, 3, 12));
  
  for (let l = 0; l < layers; l++) {
    let layerHue = (hue(colors[0]) + l * 15) % 360;
    fill(layerHue, 70, 90, 0.5);
    
    beginShape();
    for (let i = 0; i < points; i++) {
      let angle = TWO_PI / points * i;
      let variation = sin(t * 2 + l) * (s * 0.1);
      let r = (s * 0.4) - (l * 15) + variation;
      let x = cos(angle) * r;
      let y = sin(angle) * r;
      let innerAngle = angle + (TWO_PI / points) * angled
      let innerR = r * 0.8;
      let ix = cos(innerAngle) * innerR;
      let iy = sin(innerAngle) * innerR;
      
      curveVertex(x, y);
      curveVertex(ix, iy);
      ellipse(x, y, 5, 5);
    }
    endShape(CLOSE);
  }
  pop();
}

function generateColors() {
  colors = [];
  let baseHue = random(360);
  for (let i = 0; i < 5; i++) {
    colors.push(color((baseHue + i * 20) % 360, 80, 90, 0.6));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}