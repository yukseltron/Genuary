let circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  
  // Create 10,000 circles
  for (let i = 0; i < 10000; i++) {
    circles.push({
      x: random(width),
      y: random(height),
      size: random(10),
      color: color(random(100,255), random(255), random(255)),
      noiseOffsetX: random(1000),
      noiseOffsetY: random(1000)
    });
  }
}

function draw() {
  
  // Move and draw each circle
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    
    // Update circle position using Perlin noise
    circle.x += map(noise(circle.noiseOffsetX), 0, 1, -1, 1);
    circle.y += map(noise(circle.noiseOffsetY), 0, 1, -1, 1);
    
    // Wrap around if circle goes off-screen
    circle.x = (circle.x + width) % width;
    circle.y = (circle.y + height) % height;

    // Draw the circle
    fill(circle.color);
    ellipse(circle.x, circle.y, circle.size);
    
    // Increment noise offsets for the next frame
    circle.noiseOffsetX += 0.01;
    circle.noiseOffsetY += 0.01;
  }
}
