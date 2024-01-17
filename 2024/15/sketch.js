// let factor;
// let factorK;

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   background('black');
//   factor = random(10, 100);
//   factorK = random(3,10);

// }

// function draw() {
//   i=n=a=0;
  
//   draw = () => {
//     // colorMode(HSB,1);
//     v = createVector;
//     h(i++);
//     m = a.mult(20).add(factor);
//     noStroke();
//     fill(i*0.5,200,200);
//     ellipse(m.x,n.y,100);
//     n = m;
//   };
  
//   h = (i) => {
//     a = v((i&2)>>1,[0,1,1][i&3]);
    
//     for( j=1; j<8;) {
//       i /= 3;
//       k = i & 3;
//       l = 2**j++;
//       !k?a = v(a.y,a.x) : k < 2 ? a.y += l : k == 2 ? a.add(l,l) : a = v(l-1-a.y+l,l-1-a.x)
//     }
//   }
// }

let factor;
let factorK

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('black');
  factor = random(10, 200);
  factorK = random(3,20);

}

function draw() {
  i=n=a=0;
  
  draw = () => {
    colorMode(HSB,1);
    v = createVector;
    h(i++);
    m = a.mult(20).add(factor);
    fill(i/10**3,1,1, random(0.1, 0.5));
    noStroke();
    ellipse(m.x,m.y,100);
    n = m;
  };
  
  h = (i) => {
    a = v((i&2)>>1,[0,1,1][i&3]);
    
    for(j=1; j<80;) {
      i /= 3;
      k = i & factorK;
      l = 2** j++;
      !k?a = v(a.y,a.x) : k < 2 ? a.y += l : k == 2 ? a.add(l,l) : a = v(l-a.y+l,l-a.x)
    }
  }
}

