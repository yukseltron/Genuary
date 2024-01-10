let sphereSize = 100;
let posX = 0;
let posY = 0;
let speedX;
let speedY;
let img;

async function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background('black');
  img = await loadImage('gradient.png');
  texture(img);
  
  // Set random initial directions for speedX and speedY
  speedX = random(-3, 3); // Change the range as needed
  speedY = random(-3, 3); // Change the range as needed
  previousRGB = [random(255), random(255), random(255)];
}

function draw() {
  noStroke();
  // Update sphere position
  posX += speedX;
  posY += speedY;

  // Bouncing logic
  if (posX + sphereSize / 2 > width / 2 || posX - sphereSize / 2 < -width / 2) {
    speedX *= -1;
  }
  if (posY + sphereSize / 2 > height / 2 || posY - sphereSize / 2 < -height / 2) {
    speedY *= -1;
  }

  // Draw the bouncing sphere
  push();
  translate(posX, posY, 0);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  sphere(sphereSize);
  pop();
}
