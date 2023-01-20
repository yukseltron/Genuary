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
  plantTwo = new Walker(random(windowWidth/2-100,windowWidth/2 + 100), ledge);
  plantThree = new Walker(random(windowWidth/2-100,windowWidth/2 + 100), ledge);
  plantFour = new Walker(random(windowWidth/2-100,windowWidth/2 + 100), ledge);
  plantFive = new Walker(random(windowWidth/2-100,windowWidth/2 + 100), ledge);
  plantSix = new Walker(random(windowWidth/2-100,windowWidth/2 + 100), ledge);
} 

function draw() {
  //translate(windowWidth/2, windowHeight/2)
  fill(140);
  noStroke();
  
  plantOne.step();
  plantOne.render();
  
  plantTwo.step();
  plantTwo.render();
  
  plantThree.step();
  plantThree.render();
  
  plantFour.step();
  plantFour.render();
  
  plantFive.step();
  plantFive.render();
  
  plantSix.step();
  plantSix.render();
}

var Walker = function(x, y){
  
  this.x = x;
  this.y = y;
  
  this.getX = this.x;
  this.getY = this.y;
  
  this.spacing = 10;
  
  this.direction = 0;
  
  
  this.render = function(){
      this.r = 0;
  		this.g = random(10, 255);
  		this.b = 0;
    noStroke();
    this.size = random(3, 5);
    //point(this.x, this.y);
    fill(this.r, this.g, this.b);
    rect(this.x, this.y, this.size, this.size);
    if (random(10) >= 9.9)
      flower(this.x+10, this.y+10, 10, 'red');
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

function flower(x,y,r, color) {
  stroke('lightgreen');
  noFill();
  beginShape();
  vertex(x-random(5), y+random(5));
  vertex(x, y+random(20));
  vertex(x+random(5), y+random(5));
  vertex(x+random(20), y);
  vertex(x+random(5), y-random(5));
  vertex(x, y-random(20));
  vertex(x-random(5), y-random(5));
  vertex(x-random(20), y);
  endShape();
  
  noStroke();
  fill(color)
  ellipse(x,y,r);
  fill('yellow')
  ellipse(x,y,r/2);
}