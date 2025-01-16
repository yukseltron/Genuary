class Snake {
    constructor() {
      this.path = [createVector(width/2, height/2)]; 
      this.stepSize = 10; 
      this.maxLength = 100; 
      this.angle = 0; 
    }
  
    update() {
      let newX = this.path[this.path.length - 1].x + cos(this.angle) * this.stepSize;
      let newY = this.path[this.path.length - 1].y + sin(this.angle) * this.stepSize;
      
      if (newX < 0 || newX > width || newY < 0 || newY > height) {
        this.angle += PI; 
      } else {
        this.path.push(createVector(newX, newY));
        if (this.path.length > this.maxLength) {
          this.path.shift(); 
        }
      }
  
      this.angle += random(-PI / 6, PI / 6); 
    }
  
    draw(colour) {
      fill(colour);
      noStroke();
      beginShape();
      for (let i = 0; i < this.path.length; i++) {
        curveVertex(this.path[i].x, this.path[i].y);
      }
      endShape();
    }
  }
  
  let snakes = [];
  let colours = [];
  let backgroundColor;
  
  function setup() {
    createCanvas(500, 500);
    backgroundColor = color(0);
    for (let i = 0; i < 50; i++) { 
      snakes.push(new Snake());
      colours.push(color(random(255), random(255), random(255)));
    }
  }
  
  function draw() {
    background(backgroundColor);
    for (let i = 0; i < snakes.length; i++) {
      snakes[i].update();
      snakes[i].draw(colours[i]);
    }
  }
  