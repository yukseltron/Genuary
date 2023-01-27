let phase = 0;
let zoff = 0;
let breathing = 10;
let breathingInc = 0.5;
let monoSynth;
let dash;

let angle;
let size;
let chance;

let colors;
let strokes;
let offset;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  monoSynth = new p5.MonoSynth();
  frameRate(10);
  dash = [
    random([true, false]),
    random([true, false]),
    random([true, false]),
    random([true, false]),
    random([true, false]),
    random([true, false]),
    random([true, false]),
    random([true, false]),
    random([true, false]),
    random([true, false]),
    random([true, false]),
    random([true, false]),
    random([true, false]),
    random([true, false])
  ]
  angleTop = random(5,40);
  angleBottom = random(15,50);
  size = random(0.25,0.75);
  strokeWeight(3);
  chance = random([1,2,3]);
  colors = ['#c39cb5', '#f2bb10', '#e7b23b', '#e8b005', '#e3342a', '#91a6d4', '#e3e3e2', '#e25122', '', '', '', '', ''];
  strokes = ['#c39cb5', '#f2bb10', '#e3342a', '#91a6d4', '#e3e3e2', '',];
  offset = [
    random(-50, 50),
    random(-50, 50),
    random(-50, 50),
    random(-50, 50),
    random(-50, 50),
    random(-50, 50),
    random(-50, 50),
    random(-50, 50),
    random(-50, 50),
    random(-50, 50),
    random(-50, 50),
    random(-50, 50),
    random(-50, 50),
    random(-50, 50),
    random(-50, 50),
    random(-50, 50),
    random(-50, 50),
  ]

  const shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  shuffle(strokes);
  shuffle(colors);
}

function draw() {
  background(0);
  translate(windowWidth/2, windowHeight/2)
  stroke(strokes[0]);

  if (chance === 1) {
    stroke(strokes[0]);
    wobbleStroke(1.5, size*1.5,    -50 - offset[0], 0 + offset[14],    0, dash[0], colors[0]);
    stroke(strokes[1]);
    wobbleStroke(1.5, size*1.5,    50 + offset[1], 0 + offset[13],    0, dash[1]), colors[1];
  } else if (chance === 2) {
    stroke(strokes[0]);
    wobbleStroke(1.5, size*1.5,    0, 0 + offset[3],    45 + offset[12], dash[0]), colors[2];
    stroke(strokes[1]);
    wobbleStroke(1.5, size*1.5,    0, 0 + offset[4],    -45 - offset[11], dash[1], colors[3]);
  } else {
    stroke(strokes[0]);
    wobbleStroke(1.5, size*1.5,    0, 0 + offset[5],    0 + offset[10], dash[0], colors[4]);
    stroke(strokes[1]);
    wobbleStroke(1.5, size*1.5,    0, 0 + offset[6],    90 + offset[9], dash[1], colors[5]);
  }

  wobbleStroke(1.5, size,    0, -100 - offset[7],    0 + offset[8], dash[2], colors[6]);

  stroke(strokes[1]);
  wobbleStroke(1.5, size-0.4, -150 - offset[8], -100 - offset[7],  -angleTop, dash[3], colors[7]);
  stroke(strokes[3]);
  wobbleStroke(1.5, size-0.2, -100 - offset[9], -100 - offset[6],  -angleTop-5,  dash[4], colors[8]);

  stroke(strokes[2]);
  wobbleStroke(1.5, size-0.2,  100 + offset[10], -100 - offset[5],   angleTop,  dash[5], colors[9]);
  stroke(strokes[4]);
  wobbleStroke(1.5, size-0.4,  150 + offset[11], -100 - offset[4],   angleTop+5, dash[6], colors[10]);

  stroke(strokes[3]);
  wobbleStroke(1, size,  0, 200 + offset[12],   0 + offset[3], dash[7], colors[11]);

  stroke(strokes[4]);
  wobbleStroke(1, size-0.2,  50 + offset[13], 200 + offset[2],   angleBottom, dash[8], colors[12]);
  stroke(strokes[5]);
  wobbleStroke(1, size-0.2,  -50 - offset[14], 200 + offset[2],   -angleBottom, dash[9], colors[13]);
  
}

function wobble(nm, v, dash, c)
{
  push();
  if (c)
    fill(c)
  else
    noFill();

  if (dash)
    setLineDash([5, 5]);

  beginShape();
  let noiseMax = nm;
  for (let a = 0; a < 360; a += 5) {
    let xoff = map(cos(a + phase), -1, 1, 0, noiseMax);
    let yoff = map(sin(a + phase), -1, 1, 0, noiseMax);
    let r = map(noise(xoff, yoff, zoff), 0, 1, 50, 88);
    let x = (r * cos(a) * v * (sin(0.185 * breathing) + 2));
    let y = (r * sin(a) * v * (sin(0.185 * breathing) + 3));
    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
  phase += 0.3;
  zoff += 0.01;
  breathing += 0.5;
}

function wobbleStroke(nm, v, x, y, r, dash, c) {
  rotate(r);
  translate(x,y);
  wobble(nm, v, dash, c);
  wobble(nm, v-(x/100), !dash);
  translate(-x,-y);
  rotate(-r);
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}