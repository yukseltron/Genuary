
const C = {
  loaded: false,
  prop() {return this.height/this.width},
  isLandscape() {return window.innerHeight <= window.innerWidth * this.prop()},
  resize () {
    if (this.isLandscape()) {
      document.getElementById(this.css).style.height = "100%";
      document.getElementById(this.css).style.removeProperty('width');
    } else {
      document.getElementById(this.css).style.removeProperty('height');
      document.getElementById(this.css).style.width = "100%";
    }
  },
  setSize(w,h,p,css) {
    this.width = w, this.height = h, this.pD = p, this.css = css;
  },
  createCanvas() {
    this.main = createCanvas(this.width,this.height,WEBGL), pixelDensity(this.pD), this.main.id(this.css), this.resize();
  }
};

C.setSize(600, 600, 1, 'mainCanvas');

function windowResized() { C.resize(); }

let palette = ['#FF0055', '#00FF99', '#00CCFF', '#FFFF00', '#FF9900'];
let x, y, prevX, prevY;
let angle = 0;
let stepSize = 60; 
let visited = [];
let collisionThreshold = 40; 
let maxVisited = 2000; 

function setup() {
  frameRate(12);
  C.createCanvas();
  angleMode(DEGREES);
  background('#0a0a0a'); 
  
  brush.load();
  
  x = 200;
  y = 200;
  prevX = x;
  prevY = y;
  
  visited.push({x: x, y: y});
}

function draw() {
  translate(-width/2, -height/2);
  let nextX = x + cos(angle) * stepSize;
  let nextY = y + sin(angle) * stepSize;

  function isColliding(nx, ny) {
    let skip = 6; 
    for (let i = 0; i < Math.max(0, visited.length - skip); i++) {
      const p = visited[i];
      if (dist(nx, ny, p.x, p.y) < collisionThreshold) return true;
    }
    return false;
  }

  let attempts = 0;
  while (isColliding(nextX, nextY) && attempts < 10) {
    
    if (random(1) < 0.8) {
      angle += random() < 0.5 ? 90 : -90;
    } else {
      angle += random(-180, 180);
    }
    nextX = x + cos(angle) * stepSize;
    nextY = y + sin(angle) * stepSize;
    attempts++;
  }

  if (isColliding(nextX, nextY)) {
    let shortStep = stepSize * 0.5;
    nextX = x + cos(angle) * shortStep;
    nextY = y + sin(angle) * shortStep;
  }
  
  x = nextX;
  y = nextY;
  
  if (x < 50 || x > width - 50 || y < 50 || y > height - 50 || random(1) < 0.02) {
    let turns = random(-180, 180);
    angle += random(turns);
    x = constrain(x, 50, width - 50);
    y = constrain(y, 50, height - 50);
  }

  brush.set('2B', random(palette), 1);
  brush.strokeWeight(10);
  brush.line(prevX, prevY, x, y);
  prevX = x;
  prevY = y;

  visited.push({x: x, y: y});
  if (visited.length > maxVisited) visited.shift();
  if (frameCount > 200) noLoop();
}