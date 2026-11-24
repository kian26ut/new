import Platform from "./platform.js"; // Imports the platform class

let backgroundImage; // Stores the background image
let platforms = []; // Stores all platforms

function preload() {
  // Loads images before the game starts
  backgroundImage = loadImage("assets/doodlejump-background-space.png"); // Loads the background
}

function setup() {
  // Runs once when the game starts
  createCanvas(360, 776); // Creates the game canvas

  for (let i = 0; i < 7; i++) {
    // Creates 7 platforms
    let x = random(20, 240); // Random horizontal position
    let y = 700 - i * 100; // Places platforms above each other

    platforms.push(new Platform(x, y, 70, 13)); // Adds a platform
  }
}

function draw() {
  // Runs continuously
  image(backgroundImage, 0, 0, width, height); // Draws the background

  for (let i = 0; i < platforms.length; i++) {
    // Goes through all platforms
    platforms[i].draw(); // Draws each platform
  }
}
