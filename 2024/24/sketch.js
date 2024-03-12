function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  noLoop(); // We only need to draw once
}

function draw() {
  background(255);
  translate(width / 2, height / 2);
  
  let triangleSize = 100;
  let colors = ['#FF5733', '#338DFF', '#7CFF33']; // Colors for the gradient
  
  // Draw the three sides of the triangle with gradient colors
  for (let i = 0; i < 3; i++) {
    let gradient = drawingContext.createLinearGradient(-triangleSize, -triangleSize, triangleSize, triangleSize);
    gradient.addColorStop(0, colors[i]);
    gradient.addColorStop(1, '#FFFFFF'); // White color to create a shiny effect
    
    drawingContext.strokeStyle = gradient;
    drawingContext.lineWidth = 4;
    
    beginShape();
    vertex(0, 0);
    let angle1 = i * 120;
    let x1 = cos(angle1) * triangleSize;
    let y1 = sin(angle1) * triangleSize;
    vertex(x1, y1);
    
    let angle2 = (i + 1) * 120;
    let x2 = cos(angle2) * triangleSize;
    let y2 = sin(angle2) * triangleSize;
    vertex(x2, y2);
    endShape(CLOSE);
  }
  
  // Draw lines to create optical illusion effect
  let lineLength = triangleSize * sqrt(3);
  stroke(0);
  strokeWeight(2);
  line(-triangleSize, -triangleSize, triangleSize, triangleSize);
  line(triangleSize, -triangleSize, -triangleSize, triangleSize);
  line(-triangleSize, -triangleSize, 0, lineLength);
  line(triangleSize, -triangleSize, 0, lineLength);
}
