let lines = [];
let numLines = 40;
let time = 0;

function setup() {
  createCanvas(800, 800, SVG); 
  strokeWeight(1);
  noFill();
  stroke('white'); 
}

function draw() {
  clear(); 
  
  let margin = 100;
  let w = width - margin * 2;
  let h = height - margin * 2;

  for (let i = 0; i < numLines; i++) {
    let inter = map(i, 0, numLines, 0, 1);
    let shift = sin(time + i * 0.1) * 100;
    let yOffset = margin + inter * h;
    
    beginShape();
    for (let x = margin; x <= width - margin; x += 5) {
      let n = noise(x * 0.010, i * 0.5, time * 0.005);
      let wave = sin(x * 0.009 + time + i * 0.002) * (100 * n);
      let detail = cos(x * 0.05 - time) * 10;
      let py = yOffset + wave + detail + shift;
      
      py = constrain(py, margin, height - margin);
      
      vertex(x, py);
    }
    endShape();
  }

  time += 0.01;
}


function keyPressed() {
  if (key === 's') {
    save("penplot_export.svg"); 
  }
}