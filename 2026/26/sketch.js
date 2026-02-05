let t = 0; 

function setup() {
  createCanvas(600, 600);
  stroke('orangered');
  noFill();
  strokeWeight(2);
}

function draw() {
  background(0); 

  let margin = 40;
  let size = min(width, height) - margin * 2;
  
  push();
  translate(width / 2 - size / 2, height / 2 - size / 2);
  generateGrid(0, 0, size, 0);
  pop();
  
  t += 0.008; 
}

function generateGrid(x, y, s, depth) {
  rect(x, y, s, s);
  
  let n = noise(x * 0.05, y * 0.05, t);
  let splitProb = map(depth, 0, 7, 0.8, 0.1);

  if (depth < 10 && n < splitProb) {
    let newS = s / 2;
    generateGrid(x, y, newS, depth + 1);             
    generateGrid(x + newS, y, newS, depth + 1);      
    generateGrid(x, y + newS, newS, depth + 1);      
    generateGrid(x + newS, y + newS, newS, depth + 1); 
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}