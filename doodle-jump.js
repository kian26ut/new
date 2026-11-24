let backgroundImage;

function preload() {
  backgroundImage = loadImage("assets/doodlejump-background-03.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  image(backgroundImage, 0, 0, width, height);
}
