import Platform from "./platform.js"; // Imports the platform class
import Character from "./character.js"; // Imports the character class

let backgroundImage; // Stores the background image
let characterImage; // Stores the character image
let platforms = []; // Stores all platforms
let player; // Stores the player

// Which mode the game is in: "start", "playing" or "gameOver"
let gameState = "start";

// Position and size of the button
let buttonX = 105;
let buttonY = 360;
let buttonW = 150;
let buttonH = 50;

function preload() {
  backgroundImage = loadImage("assets/doodlejump-background-space.png");
  characterImage = loadImage("assets/doodlejump-character.png");
}

function setup() {
  createCanvas(360, 776);
  resetGame();
}

// Creates everything for a new round: platforms and character
function resetGame() {
  platforms = [];

  for (let i = 0; i < 7; i++) {
    let x = random(20, 240);
    let y = 700 - i * 100;
    platforms.push(new Platform(x, y, 70, 13));
  }

  player = new Character(130, 600, 40, 48, characterImage);
}

function draw() {
  image(backgroundImage, 0, 0, width, height);

  if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "playing") {
    for (let i = 0; i < platforms.length; i++) {
      platforms[i].draw();
    }

    player.move();
    player.draw();

    // Game over if the character falls out below the bottom
    if (player.yPos > height) {
      gameState = "gameOver";
    }
  } else if (gameState === "gameOver") {
    drawGameOverScreen();
  }
}

function drawStartScreen() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Doodle Jump", width / 2, 250);
  drawButton("Start");
}

function drawGameOverScreen() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Game Over", width / 2, 250);
  drawButton("Play again");
}

function drawButton(label) {
  fill(255, 200, 0);
  rect(buttonX, buttonY, buttonW, buttonH, 10);
  fill(0);
  textSize(20);
  text(label, buttonX + buttonW / 2, buttonY + buttonH / 2);
}

function mousePressed() {
  let onButton =
    mouseX > buttonX &&
    mouseX < buttonX + buttonW &&
    mouseY > buttonY &&
    mouseY < buttonY + buttonH;

  if (onButton && (gameState === "start" || gameState === "gameOver")) {
    resetGame();
    gameState = "playing";
  }
}

// Needed because the file uses "import"
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
