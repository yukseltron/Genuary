var plantOne;
var plantTwo;
var plantThree;
var plantFour;
var plantFive;
var plantSix;

var ledge = 400;

function setup() { 
  createCanvas(windowWidth, windowHeight);
  background(0);
  plantOne = new Walker(random(windowWidth/2-100,windowWidth/2 + 100) , ledge);
} 

function draw() {
  plantOne.step();
  plantOne.render();
}

var Walker = function(x, y){
  
  this.x = x;
  this.y = y;
  
  this.getX = this.x;
  this.getY = this.y;
  
  this.spacing = 10;
  
  this.direction = 0;
  
  
  this.render = function(){
    this.r = random(100, 255);
    this.g = random(100, 255);
    this.b = random(100, 255);
    if (random(10) >= 3)
      noFill();
    else
      fill(this.r, this.g, this.b);

    this.size = random(50, 200);
    stroke(this.r, this.g, this.b);
    rotate(random(100));
    if (random(10) >= 9)
      rect(this.x, this.y, random(this.size), random(this.size));
    else if (random(10) >= 8.5)
      line(this.x, this.y, random(this.x+10, this.x+50), random(this.y+10, this.y+50));
    else
      ellipse(this.x+10, this.y+10, random(50));
  }
  
  this.step = function(){
    
    this.choice = Math.floor(random(0, 4));
    
    if (this.direction == 1){
      
      if (this.choice == 0){
      	this.x+=this.spacing;
    	} else if (this.choice == 1){
      	this.x-=this.spacing;
    	} else if (this.choice == 2){
      	this.y+=this.spacing+1;
    	} else if (this.choice == 3) {
      	this.y-=this.spacing;
    	}
    } else {
    	if (this.choice == 0){
      	this.x+=this.spacing;
    	} else if (this.choice == 1){
      	this.x-=this.spacing;
    	} else if (this.choice == 2){
      	this.y+=this.spacing;
    	} else if (this.choice == 3) {
      	this.y-=this.spacing+1;
    	}
    }
    
    if (this.y == 75 && this.direction == 0){
      // grow down once vines reach the top
      this.direction = 1;
    }
    
    if (this.y == 370 && this.direction == 1){
      // grow up vines and stay there
      this.direction = -1;
    }
      
  }
  
};