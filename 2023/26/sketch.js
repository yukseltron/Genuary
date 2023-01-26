let x;
let offset;
let w;
let h;

function setup() {
  createCanvas(windowWidth, windowHeight);
  w = windowWidth;
  h = windowHeight;

  rectMode(CENTER);
  angleMode(DEGREES);
  frameRate(3);

}

function draw() {
  clear();
  background(0);
  stroke('white');
  noFill();
  translate(w/2, h/2);
  eyes(random([1,2,3]));
  eyes(random([1,2,3]));
  eyes(random([1,2,3]));
  nose(random([1,2,3,4,5,6,7,8,9]));
  nose(random([1,2,3,4,5,6,7,8,9]));
  mouth(random([1,2,3,3,3,3]))
  
}

function eyes(x) {
  if (x === 1) {
    ellipse(-200,-50,100)
    ellipse(200,-50,100)
  } else if (x === 2) {
    rect(-200,-50,100,100)
    rect(200,-50,100,100)
  } else {
    quad(-200,0, -250,-50, -200,-100, -150,-50);
    quad(200,0, 250,-50, 200,-100, 150,-50);
  }

  pupils(random([1,2,3]))
}

function pupils(x) {
  stroke(random(50,255), random(50,255), random(50,255))
  if (x === 1) {
    ellipse(-200,-50,50)
    ellipse(200,-50,50)
    ellipse(-200,-50,20)
    ellipse(200,-50,20)
  } else if (x === 2) {
    rect(-200,-50,40,40)
    rect(200,-50,40,40)
    rect(-200,-50,20,20)
    rect(200,-50,20,20)
  } else {
    quad(-200,-25, -225,-50, -200,-75, -175,-50);
    quad(200,-25, 225,-50, 200,-75, 175,-50);
  }
  stroke('white');
}

function nose(x) {
  if (x === 1) {
    triangle(50,50, -50,50, 0,-50);
  } else if (x === 2) {
    triangle(50,-50, -50,-50, 0,50);
  } else if (x === 3) {
    triangle(50,50, -50,50, 0,-50);
    triangle(50,-50, -50,-50, 0,50);
  } else if (x === 4) {
    rect(0,0,50,100);
  } else if (x === 5) {
    rect(0,0,50,50);
  } else if (x === 6) {
    rect(0,0,50,100);
    ellipse(0,0,50)
  } else if (x === 7) {
    ellipse(0,0,50,100)
  } else if (x === 8) {
    ellipse(0,0,50)
  } else {
    rect(0,0,50,50);
    ellipse(0,0,50)
  }
}

function mouth(x) {
  if (x === 1) {
    rect(-150,150,25,50)
    rect(-125,200,25,50)
    rect(-100,200,25,50)
    rect(-75,200,25,50)
    rect(-50,200,25,50)
    rect(-25,200,25,50)
    rect(0,200,25,50)
    rect(25,200,25,50)
    rect(50,200,25,50)
    rect(75,200,25,50)
    rect(100,200,25,50)
    rect(125,200,25,50)
    rect(150,150,25,50)
  } else if (x === 2) {
    rect(-150,150,25,50)
    rect(0,200,275,50);
    rect(0,200,random(50,200),random(10,25));
    rect(150,150,25,50)
  } else if (x === 3) {
    rect(-150,150,25,50)
    rect(-125,200,25,50)
    rect(-100,200,25,random(10,50))
    rect(-75,200,25,random(10,50))
    rect(-50,200,25,random(10,50))
    rect(-25,200,25,random(10,50))
    rect(0,200,25,random(10,50))
    rect(25,200,25,random(10,50))
    rect(50,200,25,random(10,50))
    rect(75,200,25,random(10,50))
    rect(100,200,25,random(10,50))
    rect(125,200,25,50)
    rect(150,150,25,50)
  }

}