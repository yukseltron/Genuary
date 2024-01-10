let cols, rows;
let resolution = 50;
let lines = [];
let counter = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('blue');
  stroke('orangered');
  strokeWeight(5);
  cols = width / resolution;
  rows = height / resolution;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      lines.push(random([i*j, i+j]));
    }
  }

  frameRate(10);
  drawGrid(); // Start drawing the grid
}

function drawGrid() {
  // Iterate through the columns and rows using setTimeout
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      setTimeout(() => {
        let x = i * resolution;
        let y = j * resolution;
        drawSquare(x, y, 50);
        counter = (counter + 1) % (cols * rows);
      }, 100 * (i + j)); // Delay based on column and row index
    }
  }
}

function drawSquare(x, y, size) {
  let step = size / lines[counter];

  for (let i = 0; i < lines[counter]; i++) {

    const lineChoice = random([0, 1, 2, 3]);
    switch(lineChoice) {
      case 0:
        line(x, y, x+size, y+size);
        break;
      case 1:
        line(x+size, y, x, y+size);
        break;
      case 2:
        line(x, y, x+random(size), y);
        break;
      case 3:
        line(x, y, x-size, y+size);
        break;
    }
    rotate(PI/2);

    // line(x, y, x+size, y+size);
    // line(x+size, y, x, y+size);


    // line(x, y, x+size, y);
    // line(x, y, x+size, y+size);
    

    // // Vertical lines
    // line(x + i * step, y, x + size, y + i * step);
    // // Horizontal lines
    // line(x, y + i * step, x + i * step, y + size);
  }
}
