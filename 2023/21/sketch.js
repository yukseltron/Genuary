
let s = 20;
let reverse = false;
let w;
let h;
let size
let rowType;
let f;
let counter;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  drawGrid(1);
  noFill();
  frameRate(1);
  if (s >= windowHeight/2){
    //reset();
    reverse = true;
  } else if (s <= 0) {
    reverse = false;
  }
}

function drawGrid(i) {
  w = windowWidth/2;
  h = windowHeight/2;
  s = !reverse ? s += i : s -= i;
  size = random(100,200);
  rows = random(10);
  rowType = random([1,2,3,4]);
  counter = random([true, false]);

  rectMode(CENTER);
  angleMode(DEGREES);
  translate(w,h);

  noFill();s
  stroke('white');
  strokeWeight(2);

  rect(0,0,windowWidth/4,windowHeight/1.25)
  rect(0,0,windowWidth/random([4,4.25,4.5]),windowHeight/random(1.25,1.4))
  ellipse(0,0,random(200))
  ellipse(0,0,random(200))
  let r = random(100)
  ellipse(0,-200,r)
  ellipse(0,200,r)

  if (rows >= 8) {
    let r = random([true, false])
    //stroke(random(100,255), 0, random(100,255))
    f = random([1,2]);

    drawWindow(-100,-size, r);
    drawWindow(-50,-size, r);
    drawWindow(0,-size, r);
    drawWindow(50,-size, r);
    drawWindow(100,-size,r );
  
    drawWindow(-100,size, r);
    drawWindow(-50,size, r);
    drawWindow(0,size, r);
    drawWindow(50,size, r);
    drawWindow(100,size, r);

    r = random([true, false])
    f = random([1,2]);
    //stroke(random(100,255), random(100,255), 0)

    drawWindow(-100, 0, r);
    drawWindow(-50, 0, r);
    drawWindow(0, 0, r);
    drawWindow(50, 0, r);
    drawWindow(100, 0, r);
  
  } else if (rows >= 6) {
    let r = random([true, false])
    f = random([1,2]);
    //stroke(random(100,255), 0, random(100,255))
    //drawWindow(-100,-size);
    drawWindow(-50,-size, r);
    //drawWindow(0,-size);
    drawWindow(50,-size, r);
    //drawWindow(100,-size);
  
    //drawWindow(-100,size);
    drawWindow(-50,size, r);
    //drawWindow(0,size);
    drawWindow(50,size, r);
    //drawWindow(100,size);

    r = random([true, false])
    f = random([1,2]);
    //stroke(random(100,255), random(100,255), 0)

    drawWindow(-100,0, r);
    //drawWindow(-50,0);
    drawWindow(0,0, r);
    //drawWindow(50,0);
    drawWindow(100,0, r);
  } else {
    let r = random([true, false])
    //stroke(random(100,255), 0, random(100,255))
    f = random([1,2]);

    drawWindow(-100,-size, r);
    //drawWindow(-50,-size);
    drawWindow(0,-size, r);
    //drawWindow(50,-size);
    drawWindow(100,-size, r);
  
    drawWindow(-100,size, r);
    //drawWindow(-50,size);
    drawWindow(0,size, r);
    //drawWindow(50,size);
    drawWindow(100,size, r);  

    r = random([true, false])
    f = random([1,2]);
    //stroke(random(100,255), random(100,255), 0)

    //drawWindow(-100,0);
    drawWindow(-50,0, r);
    //drawWindow(0,0);
    drawWindow(50,0, r);
    //drawWindow(100,0);
  
  }
}

function drawWindow(x,y, r) {
  if (rowType === 1) {
    upArrow(x, y, 25);
    downArrow(x, y, 25);
  } else if (rowType === 2) {
    upArrow(x, y, 25);
  } else if (rowType === 3) {
    downArrow(x, y, 25);
  } else if (rowType === 4) {
    if (counter) 
      upArrow(x, y, 25);
    else
      downArrow(x, y, 25);
    counter = !counter;
  }

  if (r) {
    if (f === 1)
      rect(x,y,50, 100)
    else
      ellipse(x,y,50,100);
  }
}

function downArrow(x, y, o) {
  line(x,y, x+o, y-o)
  line(x,y, x-o, y-o) 
}

function upArrow(x, y, o) {
  line(x,y, x+o, y+o)
  line(x,y, x-o, y+o)
}
