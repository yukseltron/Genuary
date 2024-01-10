let startX, startY;
let endX, endY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('beige');
  stroke('orangered');
  // Starting and ending Y positions for the line
  startY = height/2
  endY = height/2
  
  // Initialize starting point on the left side
  startX = 0;
  endX = 0;
}

function draw() {
  let maxSegments = 1; // Maximum number of line segments to draw per frame
  
  // Draw line segment by segment
  for (let i = 0; i < maxSegments; i++) {
    let newX = endX + sin(endY/random(10)) * 100; // Randomly generate X position (using sin() to make it more interesting
    let newY = endY + cos(endX/random(10)) * 100; // Randomly generate Y position (using cos() to make it more interesting
    if (newY > height || newY < 0) {
      newY = endY; // If the new Y position is out of bounds, reset it to the previous Y position
    }
    if (newX > width || newX < 0) {
      newX = endX; // If the new X position is out of bounds, reset it to the previous X position
    }
    
    line(endX, endY, newX, newY);
    endX = newX;
    endY = newY;
  }
}

