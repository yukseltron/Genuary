let phase = 0;
let zoff = 0;
let breathing = 10;
let breathingInc = 0.5;
let monoSynth;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  monoSynth = new p5.MonoSynth();
}

function draw() {
  background(0);
  translate(windowWidth/2, windowHeight/2)
  stroke('#6F4683');
  wobble(0.25, 0.3);
  stroke('#E23E64');
  wobble(0.5, 0.5);
  stroke('#A0A0A2');
  wobble(0.75, 0.1);
  stroke('#E69D25');
  wobble(1, 0.6);
}

function wobble(nm, v)
{
  push();
  noFill();
  
  beginShape();
  let noiseMax = nm;
  for (let a = 0; a < 360; a += 5) {
    let xoff = map(cos(a + phase), -1, 1, 0, noiseMax);
    let yoff = map(sin(a + phase), -1, 1, 0, noiseMax);
    let r = map(noise(xoff, yoff, zoff), 0, 1, 50, 88);
    let x = (r * cos(a) * v * (sin(0.185 * breathing) + 3));
    let y = (r * sin(a) * v * (sin(0.185 * breathing) + 3));
    vertex(x, y);
  }
      playSynth(['Fb4'], 0.5, 1);
      playSynth(['G4', 'G2', 'C3'], 0.02, 1);
  endShape(CLOSE);
  pop();
  phase += 0.3;
  zoff += 0.01;
  breathing += 0.5;
}

function playSynth(notes, vel, d) {

  let note = random(notes);
  // note velocity (volume, from 0 to 1)
  let velocity = vel
  // time from now (in seconds)
  let time = 0;
  // note duration (in seconds)
  let dur = d;

  monoSynth.play(note, velocity, time, dur);
}

