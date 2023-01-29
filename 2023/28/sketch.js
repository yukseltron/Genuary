let words;
let colors;
let prompts;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(2)
  prompts = [
    'Are you feeling',
    'When did you last feel',
    'Why do you feel',
    'How do you feel',
    'Do you give in to',
    'Have you ever felt',
    'Do you feel',
    'Are you numb to'
  ]
  words = [
    'fear?', 
    'disgust?', 
    'joy?', 
    'sadness?', 
    'humility?',
    'rage?',
    'ennui?',
    'malaise?'
  ];
  colors = [
    'lightgreen',
    'green',
    'orange',
    'blue',
    'pink',
    'red',
    'grey',
    'purple'
  ]
  
  
}

function draw() {
  background(0);
  translate(windowWidth/2, windowHeight/2)
  poemVerse(-100,-200, 50,50)
  poemVerse(0, 0, 50, 50)
  poemVerse(-100,200, 50,50)
  
}

function poemVerse(x, y, w, h) {
  noStroke();
  fill('white');
  textSize(50);
  poemLine(x,y,w,h);
}

function poemLine(x, y, w, h) {
  let r1 = random([0,1,2,3,4,5,6,7]);
  let r2 = random([0,1,2,3,4,5,6,7]);
  let r3 = random([0,1,2,3,4,5,6,7]);
  let r4 = random([0,1,2,3,4,5,6,7]);
  
  textSize(random(40,80))
  translate(random(50), random(50))
  rotate(random(100));
  text(prompts[r1],0+x,-15+y);
  fill(colors[r2])
  text(words[r2], 0+x, 55+y);
  
  if (r3 % 2 == 0) {
    fill(colors[r2])
    noStroke();
  } else {
    stroke(colors[r2]);
    strokeWeight(4)
    noFill();
  }

  
  if (r3 % 2 == 0) {
    ellipse(-50+x,40+y,w); 
  }
  else {
    rect(-75+x, 15+y, w, h); 
  }
}