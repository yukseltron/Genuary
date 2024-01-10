let endX, endY;
let direction = 1; // Variable to control the drawing direction

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  
  endY = height / 2;
  endX = 0;
}

function draw() {
  chart();
}

function chart() {
  let maxSegments = 1; // Maximum number of line segments to draw per frame
  
  // Draw line segment by segment
  for (let i = 0; i < maxSegments; i++) {
    let newX = endX + (5 * direction); // Move in the current direction
    
    let newY = endY + random(-50, 50); // Randomly generate Y position
    if (newY > height || newY < 0) {
      newY = endY; // If the new Y position is out of bounds, reset it to the previous Y position
    }
    
    fill('white');
    rect(newX, newY, 100, 10);
    fill('lightgreen');
    rect(newX, newY, random(100), 10);
    const percentage = (Math.round(random(100) * 100) / 100).toFixed(2);;
    fill('black');
    text('loading ' + percentage, newX, newY);
    
    // Check if newX reaches the canvas boundaries
    if (newX >= windowWidth || newX <= 0) {
      direction *= -1; // Reverse the drawing direction
    }
    
    endX = newX;
    endY = newY;
  }
}
