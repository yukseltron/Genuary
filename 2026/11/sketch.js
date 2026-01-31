let src;
let lines = [];
let t = 0;
let MAX_DEPTH = 4;

function setup() {
  createCanvas(600, 600);
  textFont("monospace");
  textSize(12);
  fill(255);
  noStroke();

  src = `
let src;
let lines = [];
let t = 0;
let MAX_DEPTH = 4;

function setup() {
  createCanvas(600, 600);
  textFont("monospace");
  textSize(12);
  fill(255);
  noStroke();

  src = \${JSON.stringify(src)};
  lines = src.split("\\n");
}

function draw() {
  background(8);
  t += 0.01;

  push();
  translate(40, 40);
  renderCode(lines, 0);
  pop();
}

function renderCode(lines, depth) {
  if (depth > MAX_DEPTH) return;

  let y = 0;
  let decay = pow(1.6, depth);

  for (let i = 0; i < lines.length; i++) {
    let drift = max(0, t * decay - i * 0.12);

    push();
    translate(
      sin(t + i + depth) * 8 * drift,
      y + sin(t * 2 + i) * 3 * drift
    );
    rotate(sin(t + depth) * 0.03 * drift);

    let x = 0;
    for (let c = 0; c < lines[i].length; c++) {
      let ch = lines[i][c];
      let jitter = noise(depth, i, c, t) * 5 * drift;
      text(ch, x + jitter, 0);
      x += textWidth(ch) + random(-1, 2) * drift;
    }

    pop();
    y += 16 + sin(i + t) * 2 * drift;
  }

  push();
  translate(120, 80);
  scale(0.6);
  rotate(0.1 * sin(t + depth));
  renderCode(lines, depth + 1);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
`;

  src = src.replace("${JSON.stringify(src)}", JSON.stringify(src));
  lines = src.split("\n");
}

function draw() {
  background(8);
  t += 0.01;

  push();
  translate(40, 40);
  renderCode(lines, 0);
  pop();
}

function renderCode(lines, depth) {
  if (depth > MAX_DEPTH) return;

  let y = 0;
  let decay = pow(1.6, depth);

  for (let i = 0; i < lines.length; i++) {
    let drift = max(0, t * decay - i * 0.12);

    push();
    translate(
      sin(t + i + depth) * 8 * drift,
      y + sin(t * 2 + i) * 3 * drift
    );
    rotate(sin(t + depth) * 0.03 * drift);

    let x = 0;
    for (let c = 0; c < lines[i].length; c++) {
      let ch = lines[i][c];
      let jitter = noise(depth, i, c, t) * 5 * drift;
      text(ch, x + jitter, 0);
      x += textWidth(ch) + random(-1, 2) * drift;
    }

    pop();
    y += 16 + sin(i + t) * 2 * drift;
  }

  push();
  translate(120, 80);
  scale(0.6);
  rotate(0.1 * sin(t + depth));
  renderCode(lines, depth + 1);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
