let endX, endY;
let kidX, kidY;

let stepChar = ['/\\', '|']; // ASCII character representing footsteps
let stepSize = 40; // Size of each step

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('beige');
  textSize(stepSize);
  fill('orangered');

  // Starting and ending Y positions for the steps
  endY = height / 2;

  // Initialize starting point on the left side
  endX = width/2;
}

function draw() {
  parent();
}

function parent() {
  let footed = random([0,1]);
  frameRate(random(2,10));
  let maxSteps = 1; // Maximum number of steps to draw per frame

  // Draw steps one by one
  for (let i = 0; i < maxSteps; i++) {
    let randomAngle = random(TWO_PI); // Generate a random angle in radians

    let newX = endX + cos(randomAngle) * stepSize; // Calculate new X position
    let newY = endY + sin(randomAngle) * stepSize; // Calculate new Y position

    if (newY > height || newY < 0 || newX > width || newX < 0) {
      newX = endX; // If the new position is out of bounds, reset it to the previous position
      newY = endY;
    }

    let angle = atan2(newY - endY, newX - endX); // Calculate angle between points

    push();
    translate(endX, endY);
    rotate(angle); // Rotate the character towards the next point
    text(stepChar[footed], 0, 0);
    rotate(angle); // Rotate the character towards the next point
    textSize(stepSize/2);
    fill('blue');
    text(stepChar[footed], 0, 0);
    pop();

    endX = newX;
    endY = newY;
  }
}
