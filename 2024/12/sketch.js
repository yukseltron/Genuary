let strokeCounter = [];
let randomTranslations = [];
let randomRed;
let randomGreen;
let randomDirections = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  background('darkgreen');
  randomRed = random(200, 255);
  randomGreen = random(10, 100);
  for (let i = 0; i < 100; i++) {
    strokeCounter.push(0.1);
    randomDirections.push(random([-1, 1]));
    randomTranslations.push([random(-width+100, width-100), random(-height+100, height-100)]);
  }
}

function draw() {

  for (let i = 0; i < 100; i++) {
    push();
    translate(randomTranslations[i][0], randomTranslations[i][1]);
    cluster(i);
    pop();
  }
}


const cluster = (i) => {
  planet(randomDirections[i], random(10,20), 'white', 'transparent', 25, 100, i)
  planet(-randomDirections[i], random(10,20), 'white', 'transparent', 25, 300, i)

  planet(randomDirections[i], random(20, 35), 'white', 'transparent', 50.0, 200, i)
  planet(-randomDirections[i], random(20, 35), 'cyan', 'transparent', 50.0, 300, i)

  planet(randomDirections[i], random(10,20), 'white', 'transparent', 75, 300, i)
  planet(-randomDirections[i], random(10,20), 'white', 'transparent', 75, 300, i)

  planet(randomDirections[i], random(15,20), 'white', 'transparent', 100.0, 400, i)
  planet(-randomDirections[i], random(15,20 ), 'cyan', 'transparent', 100.0, 300, i)
}

const planet = (neg, r, strokeColor, fillColor, revolution, steps, i) => {
  const currStep = frameCount % steps;
  const t = map(currStep, 0, steps, 0, TWO_PI);
  const px = width / 2.0 + revolution * sin(t) * neg;
  const py = height / 2.0 + revolution * cos(t);

  strokeWeight(strokeCounter[i]);
  stroke(randomRed, randomGreen, 100+strokeCounter[i]);
  fill(randomRed, randomGreen, 100+strokeCounter[i]);

  if (strokeCounter[i] >= 125)
    strokeCounter[i] = 0.1;
  else
    strokeCounter[i] += 0.1;

  ellipse(px, py, r, r);
};