let backgroundImage;

function preload() {
  backgroundImage = loadImage("assets/doodlejump-background-03.png");
}

function setup() {
  //createCanvas(windowWidth, windowHeight);
  createCanvas(360, 776);
}

function draw() {
  image(backgroundImage, 0, 0, width, height);
}
