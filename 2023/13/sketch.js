// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
SketchRNN
=== */

let previous_pen = 'down';
// The SketchRNN model
let model;
// Current location of drawing
let x, y;
// The current "stroke" of the drawing
let strokePath;

// For when SketchRNN is fixed
function preload() {
  // See a list of all supported models: https://github.com/ml5js/ml5-library/blob/master/src/SketchRNN/models.js
  model = ml5.sketchRNN('cat');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  
  // run sketchRNN
  startDrawing();
}

function modelReady() {
  console.log('model loaded');
  startDrawing();
}

// Reset the drawing
function startDrawing() {
  background(0);
  // Start in the middle
  x = width / 2;
  y = height / 2;
  model.reset();
  model.generate(gotStroke);
}

function draw() {
  // If something new to draw
  if (strokePath) {
    // If the pen is down, draw a line
    if (previous_pen == 'down') {
      noFill();
      strokeWeight(1);
      random([ellipse(x+100, y, random(20)),rect(x+100, y, random(20), random(20))] );
      stroke(random(255), random(255), 0);
      strokeWeight(1);
      line(x, y, x + strokePath.dx, y + strokePath.dy);
    }
    // Move the pen
    x += strokePath.dx;
    y += strokePath.dy;
    // The pen state actually refers to the next stroke
    previous_pen = strokePath.pen;

    // If the drawing is complete
    if (strokePath.pen !== 'end') {
      strokePath = null;
      model.generate(gotStroke);
    }
  }
}

// A new stroke path
function gotStroke(err, s) {
  strokePath = s;
}
