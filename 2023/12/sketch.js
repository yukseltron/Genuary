
    var gw = 150; // grid width
    var gh = 150; // grid height
    var coords;
    let counter = true;

  
      function setup(){
          createCanvas(windowWidth, windowHeight);
          background(0, 0, 0);
      }
      
      function tessellate() {
          coords = generateShapes();
          for ( var y=0; y<height; y += gh ) {
            for ( var x=0; x<width; x+=gw ) {
                fill(counter === true ? 'black' : 'white');
                counter = !counter;
                drawShape(coords,x,y);
            }
            counter = !counter;
          }
      }
      
      function draw(){
        tessellate();
        frameRate(1);    
      }
      
      function mouseClicked() {
          tessellate();
      }
      
      function drawShape(coords,x,y) {
          
          var centreX = coords[0][6];
          var centreY = coords[0][7];
          
          var transQtys = [centreX,centreY,-gw+centreX,centreY,centreX,-gh+centreY,-gw+centreX,-gh+centreY];
           
           for ( var n=0; n<4; n += 1) {
                stroke(5);
                push();
                smooth();
                translate(transQtys[n*2],transQtys[n*2+1]);
                
                beginShape();
                    for ( var i=0; i<coords[0].length; i+=2) {
                        vertex(x+coords[n][i],y+coords[n][i+1]);
                    }
                    
                endShape(CLOSE);
                pop();
            }
      }
      
      /**
       * function to generate a shape that will tessellate
       */
      function generateShapes() {
              // centreX and centreY are point where 4 shapes meet
            var centreX = floor((gw/2) + random(-40,40));
            var centreY = floor((gh/2) + random(-40,40));
            
            
            var topCentrePoint = [floor((gw/2) + random(-213,2)), 0];
            var bottomCentrePoint = [floor(gw/2) + random(-25,20),gh];
            var leftCentrePoint = [0,floor((gh/2)+random(-20,200))];
            var rightCentrePoint = [gw,floor((gh/2)+random(-20,200))];
            
            var topMidPoint = [floor((gw/2) + random(-200,20)), floor((gh/4) + random(-20,20))];
            var rightMidPoint = [floor(gw-(gw/4)+random(-200,20)), floor((gh/2)+random(-20,20))];
            var leftMidPoint = [floor((gw/4)+random(-23,20)), floor((gh/2)+random(-20,210))];
            var bottomMidPoint = [floor((gw/2)+random(-20,200)), floor(gh-(gh/4)+random(-20,20))];
            
            var tile1Coords = [0,0].concat(topCentrePoint).concat(topMidPoint).concat([centreX,centreY]).concat(leftMidPoint).concat(leftCentrePoint);
            var tile2Coords = topCentrePoint.concat([gw,0]).concat(rightCentrePoint).concat(rightMidPoint).concat([centreX,centreY]).concat(topMidPoint);
            var tile3Coords = leftCentrePoint.concat(leftMidPoint).concat([centreX,centreY]).concat(bottomMidPoint).concat(bottomCentrePoint).concat([0,gh]);
            var tile4Coords = bottomCentrePoint.concat(bottomMidPoint).concat([centreX,centreY]).concat(rightMidPoint).concat(rightCentrePoint).concat([gw,gh]);
            var tileCoords = [tile1Coords, tile2Coords, tile3Coords, tile4Coords];
            
            return tileCoords;
      }