let font;
let counter = 0;
let displayText = '안녕';

function preload() {
  font = loadFont("NotoSansKR-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  points = font.textToPoints(displayText, windowWidth/8, windowHeight/1.5, 400, {
    sampleFactor: 0.5
  });
}

function draw() {
  background('orange');
  
  for (let i = 0; i < points.length; i++) {
    let pt = points[i];
    
    if (i + counter < points.length) {
      let nextPt = points[i + counter];
      strokeWeight(0.1);
      stroke('red');
      curve(pt.x, pt.y, nextPt.x, nextPt.y, pt.x, pt.y, nextPt.x, nextPt.y);
    }
    
    fill(10);
    //ellipse(pt.x + 10*sin(0.1*frameCount + pt.y), pt.y, 5);
  }

  // Increase the counter
  counter++;

  // Reset the counter when it reaches the end of the array
  if (counter >= points.length) {
    counter = 0;
  }
}
