import Platform from "./platform.js"; // Imports the platform class

let backgroundImage; // Stores the background image
let platforms = []; // Stores all platforms

// NEW: which mode the game is in: "start", "playing" or "gameOver"
let gameState = "start";

// NEW: position and size of the button (used on both start and game over screens)
let buttonX = 105;
let buttonY = 360;
let buttonW = 150;
let buttonH = 50;

function preload() {
  // Loads images before the game starts
  backgroundImage = loadImage("assets/doodlejump-background-space.png"); // Loads the background
}

function setup() {
  // Runs once when the game starts
  createCanvas(360, 776); // Creates the game canvas
  createPlatforms(); // NEW: your platform loop now lives in its own function
}

// NEW: creates the platforms. In its own function so we can
// run it again when the player clicks "Play again".
function createPlatforms() {
  platforms = []; // Empties the array so the old platforms disappear

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

  // NEW: draw the right screen depending on the mode
  if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "playing") {
    for (let i = 0; i < platforms.length; i++) {
      // Goes through all platforms
      platforms[i].draw(); // Draws each platform
    }

    // Later, when the character is added here:
    // if (player.yPos > height) {
    //   gameState = "gameOver";
    // }
  } else if (gameState === "gameOver") {
    drawGameOverScreen();
  }
}

// NEW: start screen with title and button
function drawStartScreen() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Doodle Jump", width / 2, 250);
  drawButton("Start");
}

// NEW: end screen with text and button
function drawGameOverScreen() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Game Over", width / 2, 250);
  drawButton("Play again");
}

// NEW: draws the button with the text we send in
function drawButton(label) {
  fill(255, 200, 0);
  rect(buttonX, buttonY, buttonW, buttonH, 10);
  fill(0);
  textSize(20);
  text(label, buttonX + buttonW / 2, buttonY + buttonH / 2);
}

// NEW: runs automatically every time you click
function mousePressed() {
  // Is the mouse inside the button?
  let onButton =
    mouseX > buttonX &&
    mouseX < buttonX + buttonW &&
    mouseY > buttonY &&
    mouseY < buttonY + buttonH;

  if (onButton && (gameState === "start" || gameState === "gameOver")) {
    createPlatforms(); // New platforms for a new round
    gameState = "playing";
  }
}

// NEW: needed because the file uses "import".
// It makes p5 find your functions.
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
