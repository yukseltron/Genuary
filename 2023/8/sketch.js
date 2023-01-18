let R = (a=1)=>Math.random()*a;
let L = (x,y)=>(x*x+y*y)**0.5; // Elements by Euclid 300 BC

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw_circle([x,y],r,c) {
  noStroke(); fill(c);
  ellipse((x+1)*width/2, (y+1)*height/2, random(20));
  
}

function sdf_circle([x,y], [cx,cy], r) {
  x -= cx;
  y -= cy;
  return L(x, y) - r;
}

function sdf_box([x,y], [cx,cy], [w,h]) {
  x -= cx;
  y -= cy;
  return k(abs(x)-w, abs(y)-h);  
}

let k = (a,b)=>a>0&&b>0?L(a,b):a>b?a:b;

function sdf_rep(x, r) {
  x/=r;
  x -= Math.floor(x)+.5;
  x*=r;
  return x;
}

function sdf([x,y]) {
  let bal = abs(sdf_rep(sdf_circle([x,y], [-.2,0], .1),.2))-.05;
  let bbl = abs(sdf_rep(sdf_circle([x,y], [.2,0], .1),.2))-.05;
  let bba = abs(sdf_rep(sdf_circle([x,y], [0,3], -.1),.2))-.05;
  return max(bal, bbl, bba);
}


function draw() {
  for (let k = 0; k < 1000; k++) {
    let p = [R(2)-1, R(2)-1];
    let d = sdf(p);
    let col = '#000';
    if (d < -.01) col = 'red';
    if (d > .01) col = 'black';
    draw_circle(p, 2, col);    
  }
}