let glitch = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	imageMode(CENTER);

	glitch = new Glitch();
	setupGlitch();
}

function draw() {
	glitch.resetBytes();

	glitch.randomBytes(1);
	glitch.replaceBytes(45, 127);

	glitch.buildImage(function() {
		displayType(); // show text
	});
	image(glitch.image, windowWidth / 2, windowHeight / 2)
	glitch.resetBytes();
}


function setupGlitch() {
	loadImage('fish.png', function(im) {
		glitch.loadType('png'); // use random type
		glitch.loadImage(im);
	});
}