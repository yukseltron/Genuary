

function setup() {
  createCanvas(windowWidth, windowHeight);
}

//-------------------------------------------
function draw() {

    background(0);


    //planet2
    planet(-1, 10, 'white', 10.0, 400)
    planet(-1, 20, 'white', 20, 200)
    planet(1, 80, 'white', 10.0, 600)


    planet(1, 100, 'white', 1, 100)

    planet(1, 15, '#ffffff', 150.0, 400)
    planet(1, 200, 'white', 200.0, 400)
    planet(1, 100, 'white', 150.0, 200)
    planet(1, 300, 'white', 100.0, 200)

    planet(1, 10, '#ffffff', 250.0, 600)
    planet(1, 10, '#ffffff', 150.0, 200)
    planet(1, 10, '#ffffff', 250.0, 200)

    planet(1, 100, '#ffffff', 300.0, 600)
    planet(1, 50, '#ffffff', 300.0, 400)

    planet(1, 10, '#ffffff', 350.0, 600)
    planet(1, 20, '#ffffff', 350.0, 400)

    planet(1, 10, '#ffffff', 375.0, 200)
}

function planet(neg, r, color, revolution, steps) {
    var currStep = frameCount % steps;
    var t = map(currStep, 0, steps, 0, TWO_PI);
    var px = width / 2.0 + revolution * cos(t) * neg;
    var py = height / 2.0 + revolution * sin(t);

    noFill();
    stroke(color);
    ellipse(px, py, r, r);
}




