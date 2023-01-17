var symbolSize = 20;
var streams = [];
var fadeInterval = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	
	var x = 0;
	for(i = 0; i <= width / symbolSize; i++) {
		stream = new Stream();
		stream.generateSymbols(x, random(10));
		streams.push(stream);
		x += symbolSize;
	}
	
	textSize(symbolSize);
}

function draw() {
	background(0, 150);
	
	streams.forEach(function(stream){
		stream.render();
	});
}


function Symbol(x, y, speed, firstSymbol, opacity) {
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.value;
	this.switchInterval = round(random(2, 20));
	this.firstSymbol = firstSymbol;
	this.opacity = opacity;
  this.r = random(255);
  this.g = random(255);
  this.b = random(255);

	
	this.symbolRandomizer = function() {
      fill(this.r, this.g, this.b);
			if(frameCount % this.switchInterval == 0){
				this.value = random(100);
		}
	}
	
	this.symbolFall = function() {	
		this.y = (this.y >= height) ? 0 : this.y += this.speed;
	}
}


function Stream() {
	this.symbols = [];
	this.totalSymbols = round(random(1, 10));
	this.speed = random(1, 5);
	
	this.generateSymbols = function(x, y) {
		var firstSymbol = round(random(0, 4)) == 1;
		var opacity = 255;
		
		for(var i = 0; i < this.totalSymbols; i++) {
			symbol = new Symbol(x, y, this.speed, firstSymbol, opacity);
			this.symbols.push(symbol);
			y -= symbolSize;
			firstSymbol = false;
			opacity -= (255 / this.totalSymbols) / fadeInterval;
		}
	}
	this.render = function() {
		this.symbols.forEach(function(symbol) {
			text(symbol.value, symbol.x, symbol.y);
			symbol.symbolFall();
      symbol.symbolRandomizer();
		});
	}
}