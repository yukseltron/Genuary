// Module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    World = Matter.World,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse;

// Create an engine
var engine = Engine.create();

// Create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'white',
        pixelRatio: window.devicePixelRatio || 1
    }
});

// Create a runner
var runner = Runner.create();

// Add the runner to the engine
Runner.run(runner, engine);

// Define canvas boundaries
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;

// Add bodies
var balls = [];
for (var i = 0; i < 100; i++) {
    var radius = Math.random() * 40 + 10; // Random radius between 10 and 40
    var ball = Bodies.circle(
        Math.random() * (canvasWidth - 2 * radius) + radius, // Random x position within canvas boundaries
        Math.random() * (canvasHeight / 2 - 2 * radius) + radius, // Random y position within upper half of canvas boundaries
        radius,
        {
            frictionAir: 0.05,
            restitution: 2,
            render: {
                fillStyle: '#000000',   
            }
        }
    );
    balls.push(ball);
}

// Create a floor
var floor = Bodies.rectangle(
    canvasWidth / 2, // Center of the canvas horizontally
    canvasHeight, // At the bottom of the canvas
    canvasWidth, // Full width of the canvas
    50, // Height of the floor
    {
        isStatic: true, // Make it a static body so it doesn't move
        restitution: 0.5, // Set some restitution for bouncing
        render: {
            visible: false // Make the floor invisible
        }
    }
);

// Create left and right walls
var wallOptions = {
    isStatic: true, // Make them static bodies so they don't move
    render: {
        visible: false // Make the walls invisible
    }
};
var leftWall = Bodies.rectangle(0, canvasHeight / 2, 50, canvasHeight, wallOptions);
var rightWall = Bodies.rectangle(canvasWidth, canvasHeight / 2, 50, canvasHeight, wallOptions);

// Add all of the bodies to the world
World.add(engine.world, [...balls, floor, leftWall, rightWall]);

// Create mouse
var mouse = Mouse.create(render.canvas);
var mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});

World.add(engine.world, mouseConstraint);

// Handle mouse hover
render.canvas.addEventListener('mousemove', function(event) {
    var mousePosition = {
        x: event.clientX,
        y: event.clientY
    };
    for (var i = 0; i < bodies.length; i++) {
        var body = bodies[i];
        if (Matter.Bounds.contains(body.bounds, mousePosition)) {
            var forceMagnitude = 0.01; // Adjust as needed
            var force = {
                x: (body.position.x - mousePosition.x) * forceMagnitude,
                y: (body.position.y - mousePosition.y) * forceMagnitude
            };
            Matter.Body.applyForce(body, body.position, force);
        }
    }
});

// Keep the mouse in sync with rendering
render.mouse = mouse;

// Run the renderer
Render.run(render);