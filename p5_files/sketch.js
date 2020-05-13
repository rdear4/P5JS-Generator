let ENV = {

    canvas: {
        width: 400,
        height: 400,
        backgroundColor: 'black'
    }

}

function setup() {

    createCanvas(ENV.canvas.width, ENV.canvas.height);

}

function draw() {

    background(ENV.canvas.backgroundColor);


}