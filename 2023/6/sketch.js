// adapted from the coding train's "painting with pixels tutorial: https://www.youtube.com/watch?v=0V3uYA1hafk

let img = [];

let particles = [];

let slider;
let slider2;
let button;

function preload() {
  img = loadImage('sunday-afternoon.png');

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  image(img, windowWidth/2, windowHeight/2, 50, 100); //draws image
  

  for (let i = 0; i < 5; i++) {
    particles[i] = new Particle(width / 2, height / 2);
  }

  background(0);
}

function draw() {
  img.loadPixels();
  for (let i = 0; i < particles.length; i++) {

    particles[i].update();
    particles[i].show();


  }

}

function Particle(x, y) {
  this.x = x;
  this.y = y;

  this.update = function() {

    this.y += random(-10, 10);
    this.x += random(-10, 10);

    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  this.show = function() {

    noStroke();
    let pixelx = floor(this.x); //floor rounds down to the nearest whole number
    let pixely = floor(this.y);
    let col = img.get(pixelx, pixely); //color is determined by pixel value
    stroke(col[0], col[1], col[2]); //alpha is determined by slider value
    strokeWeight(5)
    fill(col[0], col[1], col[2]);
    line(this.x, this.y, this.x, this.y)
  }
}