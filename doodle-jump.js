import Platform from "./platform.js"; // Imports the platform class
import Character from "./character.js"; // Imports the character class

let backgroundImage; // Stores the background image
let characterImage; // Stores the character image
let player; // Stores the player character
let platforms = []; // Stores all platforms

let gameState = "start"; // Current game state

// Button position and size
let buttonX = 105;
let buttonY = 360;
let buttonW = 150;
let buttonH = 50;

function preload() {
  // Loads images before the game starts
  backgroundImage = loadImage("assets/doodlejump-background-space.png"); // Loads background
  characterImage = loadImage("assets/doodlejump-character-03.png"); // Loads character
}

function setup() {
  // Runs once when the game starts
  createCanvas(360, 776); // Creates the game canvas
  createPlatforms(); // Creates the platforms
}

function createPlatforms() {
  // Creates new platforms
  platforms = []; // Clears old platforms

  for (let i = 0; i < 7; i++) {
    // Creates 7 platforms
    let x = random(20, 240); // Random horizontal position
    let y = 700 - i * 100; // Vertical position

    platforms.push(new Platform(x, y, 70, 13)); // Adds a platform
  }
}

function draw() {
  // Runs continuously
  image(backgroundImage, 0, 0, width, height); // Draws background

  if (gameState === "start") {
    // Start screen
    drawStartScreen();
  } else if (gameState === "playing") {
    // Game is running

    let previousBottom = player.yPos + player.height; // Saves previous foot position

    player.move(); // Moves the character once per frame

    for (let i = 0; i < platforms.length; i++) {
      // Checks all platforms

      let platform = platforms[i]; // Gets current platform

      platform.draw(); // Draws the platform

      if (
        player.speedY > 0 && // Player is falling
        previousBottom <= platform.yPos && // Feet were above platform
        player.yPos + player.height >= platform.yPos && // Feet reach platform
        player.xPos + player.width > platform.xPos && // Checks left overlap
        player.xPos < platform.xPos + platform.width // Checks right overlap
      ) {
        player.yPos = platform.yPos - player.height; // Places player on platform
        player.speedY = -12; // Makes player jump again
      }
    }

    player.draw(); // Draws the character

    if (player.yPos > height) {
      // Checks if player falls below screen
      gameState = "gameOver"; // Ends the game
    }
  } else if (gameState === "gameOver") {
    // Game has ended
    drawGameOverScreen(); // Shows game over screen
  }
}

function drawStartScreen() {
  // Draws the start screen
  fill(255); // White text
  textAlign(CENTER, CENTER); // Centers text
  textSize(32); // Text size
  text("Doodle Jump", width / 2, 250); // Game title
  drawButton("Start"); // Start button
}

function drawGameOverScreen() {
  // Draws game over screen
  fill(255); // White text
  textAlign(CENTER, CENTER); // Centers text
  textSize(32); // Text size
  text("Game Over", width / 2, 250); // Game over message
  drawButton("Play again"); // Restart button
}

function drawButton(label) {
  // Draws a button
  fill(255, 200, 0); // Yellow button
  rect(buttonX, buttonY, buttonW, buttonH, 10); // Button shape
  fill(0); // Black text
  textSize(20); // Text size
  text(label, buttonX + buttonW / 2, buttonY + buttonH / 2); // Button text
}

function mousePressed() {
  // Runs when mouse is clicked

  let onButton =
    mouseX > buttonX &&
    mouseX < buttonX + buttonW &&
    mouseY > buttonY &&
    mouseY < buttonY + buttonH; // Checks if button is clicked

  if (onButton && (gameState === "start" || gameState === "gameOver")) {
    createPlatforms(); // Creates new platforms

    player = new Character(130, 600, 40, 48, characterImage); // Creates character

    gameState = "playing"; // Starts the game
  }
}

// Connects p5.js functions to the game
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
