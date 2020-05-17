let ENV;

function setup() {

    ENV = new Environment(1000, 1000, 'blue');

    createCanvas(ENV.canvas.width, ENV.canvas.height);

}

function draw() {

    background(ENV.canvas.backgroundColor);



    ENV.checkEnv();
}

function keyPressed() {

    ENV.keyPressed(keyCode, key);
    
}

function mouseClicked() {

    ENV.mouseClicked(mouseX, mouseY);
    
}