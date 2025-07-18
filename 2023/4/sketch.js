let intersections = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 1; i <= 10; i++) {
    intersections.push({
      s: height * 2 / i,
      color: [
        random(0, 255),
        random(0, 255),
        random(0, 255)
      ],
      weight: random(1, 6),
      decay: random(0.1, 1)
    });
  }
}

function draw() {
  let color1 = random(0, 205);
  let color2 = random(0, 25);
  let color3 = random(0, 105);
  background(0);
  for (let inter of intersections) {
    stroke(color1, color2, color3);
    strokeWeight(inter.weight);
    line(-inter.s, -inter.s, width, inter.s * inter.s);
    inter.s -= inter.decay;
  }
}
