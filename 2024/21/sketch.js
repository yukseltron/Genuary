// Object for creation and real-time resize of canvas
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

C.setSize(1500, 1500, 1, 'mainCanvas')

function windowResized() {
  C.resize();
}

// The example really starts here

let palette = ['pink', 'red', 'orange'];
let currentX, currentY; // Keep track of the current position

function setup() {
  frameRate(10)
  C.createCanvas()
  angleMode(DEGREES)
  background('beige');

  brush.scaleBrushes(0.5)
  brush.field("waves");
  currentX = width/3;
  currentY = height/3;

  brush.add("watercolor", {
    type: "image",
    weight: 2,
    vibration: 20,
    opacity: 1,
    spacing: 2,
    blend: true,
    pressure: {
        type: "custom",
        min_max: [0.2,3.2],
        // This formula implies that the pressure changes in a linear distribution through the whole length of the line.
        // Minimum pressure at the start, maximum pressure at the end.
        curve: (x) => 1-x
    },
    image: {
        src: "./brush_tips/brush.jpg",
    },
    rotate: "random",
})

}

function draw() {
  translate(-width/2,-height/2)

  let available_brushes = brush.box();
  console.log(available_brushes);

  brush.set('watercolor', random(palette), 1)

  currentX += random(-5, 5);
  currentY += random(-5, 5);

  //brush.flowLine(currentX, currentY, random(100, 300), random(0, 360))

  brush.set('watercolor', random(palette), 1)

  currentX += random(-50, 50);
  currentY += random(-50, 50);

  brush.circle(currentX, currentY, random(100, 300), random(0, 360))

  currentX += random(-50, 50);
  currentY += random(-50, 50);

  //brush.flowLine(currentX, currentY, random(100, 300), random(0, 360))
}

let save = true;
