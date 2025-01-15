
let mountainLayers = []; 
let numLayers = 10; 
let layerSpeed = []; 
let fillColor;

function setup() {
    createCanvas(800, 600);
    noStroke();

    
    for (let i = 0; i < numLayers; i++) {
        let layer = [];
        for (let x = 0; x <= width; x += 50) {
            let y = random(height / 2 + i * 20, height / 2 + (i + 1) * 20);
            layer.push({ x, y });
        }
        mountainLayers.push(layer);
        layerSpeed.push(random(0.1, 0.5));
    }
}

function draw() {
    background(200, 220, 255); 

    
    for (let i = numLayers - 1; i >= 0; i--) {
        fill(50 + i * 30, 50 + i * 20, 100 + i * 15); 

        beginShape();
        vertex(1000, 100);

        for (let pt of mountainLayers[i]) {
            curveVertex(pt.x, pt.y);
            
            pt.x -= layerSpeed[i];
            if (pt.x < 0) {
                pt.x = width; 
                pt.y = random(height / 2 + i * 20, height / 2 + (i + 1) * 20);
            }
        }

        vertex(width, height/2);
        endShape(CLOSE);
    }
}
