function setup() {
  createCanvas(500, 500);
  noFill();
  strokeWeight(2);
}

function draw() {
  background('white');

  let centerX = width / 2;
  let centerY = height / 2;
  let maxRadius = min(width, height) * 0.5;

  for (let i = 0; i < 40; i++) {
      let radius = map(i, 0, 19, 20, maxRadius);
      let waveOffset = sin(frameCount * 0.05 + i * 0.5) * 10;
      
      stroke('black');
      ellipse(centerX, centerY, radius + waveOffset, radius);
  }

  stroke('red');
  ellipse(centerX, centerY, 10, 10);
}
