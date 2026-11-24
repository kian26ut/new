import Platform from "./platform.js"; //imports the platform class from platform.js
let backgroundImage;

function preload() {
  backgroundImage = loadImage("assets/doodlejump-background-space.png");
}
function setup() {
  //createCanvas(windowWidth, windowHeight);
  createCanvas(360, 776);
}

function draw() {
  image(backgroundImage, 0, 0, width, height);
}
