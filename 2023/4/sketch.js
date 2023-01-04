
let a;

function setup() {
  createCanvas(windowWidth, windowHeight);
  a = height*2;
}

function draw() {
  background(0);
  drawIntersection(a);
  drawIntersection(a/2);
  drawIntersection(a/3);
  drawIntersection(a/4);
  drawIntersection(a/5);
  drawIntersection(a/6);
  drawIntersection(a/7);
  drawIntersection(a/8);
  drawIntersection(a/9);
  drawIntersection(a/10);
}

function drawIntersection(s) {
  let color1 = random(0, 205);
  let color2 = random(0, 25);
  let color3 = random(0, 105);
  stroke(color1, color2, color3);
  
  line(-s, -s, width, s*s);
  strokeWeight(5);
  
  a = a - 0.5;
}