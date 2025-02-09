let buildingSegments = [];
let windowGrid = [];
let windowSize = 15;
let spacing = 5;
let buildingDepth;
let rotationAngle = 0;
let bgColorStep = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
  generateBuilding();
}

function draw() {
  setBackgroundGradient();
  orbitControl();

  rotationAngle += 0.005;

  push();
  rotateY(rotationAngle);

  drawBuilding();
  pop();
}

function generateBuilding() {
  let numSegments = 4;
  buildingSegments = [];

  for (let i = 0; i < numSegments; i++) {
    let segmentWidth = random(40, 80);
    let segmentHeight = random(150, 350);
    buildingSegments.push({ width: segmentWidth, height: segmentHeight, windows: [] });
  }

  buildingDepth = int(random(80, 150));

  buildingSegments.forEach(segment => {
    let cols = floor(segment.width / (windowSize + spacing));
    let rows = floor(segment.height / (windowSize + spacing));
    let windows = [];
    for (let i = 0; i < cols * rows * 4; i++) {
      windows.push(random() > 0.7);
    }
    segment.windows = windows;
    segment.cols = cols;
    segment.rows = rows;
  });
}

function drawBuilding() {
  let xOffset = -sumWidths() / 2;
  let maxHeight = max(buildingSegments.map(s => s.height));
  let yOffset = maxHeight / 2;

  fill('rgb(4, 4, 28)');
  noStroke();
  for (let i = 0; i < buildingSegments.length; i++) {
    let segment = buildingSegments[i];
    push();
    translate(xOffset + segment.width / 2, -yOffset + segment.height / 2, 0);
    box(segment.width, segment.height, buildingDepth);
    drawWindows(segment, xOffset);
    pop();
    xOffset += segment.width;
  }
}

function drawWindows(segment, xOffset) {
  let xStep = segment.width / segment.cols;
  let yStep = segment.height / segment.rows;
  let yOffset = segment.height / 2;

  for (let side = 0; side < 4; side++) {
    for (let y = 0; y < segment.rows; y++) {
      for (let x = 0; x < segment.cols; x++) {
        let index = side * segment.cols * segment.rows + y * segment.cols + x;
        let isLit = segment.windows[index];
        let wx = x * xStep - segment.width / 2 + xStep / 2;
        let wy = y * yStep - yOffset + yStep / 2;

        push();
        switch (side) {
          case 0:
            translate(wx, wy, buildingDepth / 2 + 1);
            break;
          case 1:
            translate(-segment.width / 2 - 1, wy, wx);
            rotateY(HALF_PI);
            break;
          case 2:
            translate(wx, wy, -buildingDepth / 2 - 1);
            break;
          case 3:
            translate(segment.width / 2 + 1, wy, wx);
            rotateY(HALF_PI);
            break;
        }
        
        if (isLit) {
          let c1 = color(random(0, 255), random(0, 255), random(0, 255));
          let c2 = color(random(0, 255), random(0, 255), random(0, 255));
          let gradientFill = lerpColor(c1, c2, random());
          fill(gradientFill);
        } else {
          noFill();
        }
        noStroke();
        rectMode(CENTER);
        rect(0, 0, windowSize, windowSize / 4);
        pop();

        if (frameCount % 30 === 0 && random() > 0.8) {
          segment.windows[index] = !segment.windows[index];
        }
      }
    }
  }
}

function setBackgroundGradient() {
  bgColorStep += 0.002;
  let t = (sin(bgColorStep) + 1) / 2;
  let sunsetColor = color(100, 0, 100);
  let nightColor = color(10, 10, 40);
  let gradientColor = lerpColor(sunsetColor, nightColor, t);
  background(gradientColor);
}

function sumWidths() {
  return buildingSegments.reduce((sum, s) => sum + s.width, 0);
}
