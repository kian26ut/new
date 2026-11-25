import Platform from "./platform.js"; // Normal platform
import MovingPlatform from "./movingPlatform.js"; // Moving platform (Sky)
import BreakingPlatform from "./breakingPlatform.js"; // Breaking platform (Hell)
import Character from "./character.js"; // The player's character

let themes = []; // The three worlds: Space, Hell and Sky
let movingPlatformImage; // Moving platform image
let breakingPlatformImage; // Breaking platform image

let player; // Stores the player character
let platforms = []; // Stores all platforms
let score = 0; // Number of platforms landed on this round
let bestScore = 0; // Personal best

let gameState = "start"; // Current game state

// Button position and size
let buttonX = 105;
let buttonY = 360;
let buttonW = 150;
let buttonH = 50;

function preload() {
  // Loads all images before the game starts
  movingPlatformImage = loadImage("assets/doodlejump-platform-moving.png");
  breakingPlatformImage = loadImage("assets/doodlejump-platform-breaking.png");

  // Each world has a name, the score where it starts,
  // a background, a character and a normal platform image
  themes = [
    {
      name: "Space",
      startScore: 0,
      background: loadImage("assets/doodlejump-background-space.png"),
      character: loadImage("assets/doodlejump-character.png"),
      platform: loadImage("assets/doodlejump-platform.png"), // Purple
    },
    {
      name: "Hell",
      startScore: 20,
      background: loadImage("assets/doodlejump-background-hell.png"),
      character: loadImage("assets/doodlejump-character-fire.png"),
      platform: loadImage("assets/doodlejump-platform-hell.png"), // Orange
    },
    {
      name: "Sky",
      startScore: 40,
      background: loadImage("assets/doodlejump-background-sky.png"),
      character: loadImage("assets/doodlejump-character-angel.png"),
      platform: loadImage("assets/doodlejump-platform-sky.png"), // Dark blue
    },
  ];
}

function setup() {
  // Runs once when the game starts
  createCanvas(360, 776); // Creates the game canvas
  createPlatforms(); // Creates the platforms
}

// Finds the world that matches the current score
function getTheme() {
  let current = themes[0];

  for (let i = 0; i < themes.length; i++) {
    if (score >= themes[i].startScore) {
      current = themes[i];
    }
  }

  return current;
}

// Creates ONE platform. The type and image depend on which world we are in.
function createPlatform(x, y) {
  let theme = getTheme();

  if (theme.name === "Hell" && random() < 0.35) {
    return new BreakingPlatform(x, y, 70, 15, breakingPlatformImage);
  }

  if (theme.name === "Sky" && random() < 0.35) {
    return new MovingPlatform(x, y, 70, 15, movingPlatformImage);
  }

  return new Platform(x, y, 70, 15, theme.platform); // The world's own normal platform
}

// Creates the starting platforms
function createPlatforms() {
  platforms = []; // Clears old platforms

  for (let i = 0; i < 7; i++) {
    let x = random(20, 240); // Random horizontal position
    let y = 700 - i * 100; // Vertical position
    platforms.push(createPlatform(x, y)); // Adds a platform
  }
}

function draw() {
  // Runs continuously
  let theme = getTheme(); // The current world
  image(theme.background, 0, 0, width, height); // Draws the world's background

  if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "playing") {
    player.characterImage = theme.character; // Uses the world's character

    let previousBottom = player.yPos + player.height; // Saves previous foot position

    player.move(); // Moves the character once per frame

    // SCROLLING: if the player goes above the middle,
    // keep the player there and move the platforms down instead
    if (player.yPos < height / 2) {
      let difference = height / 2 - player.yPos; // How far above the middle
      player.yPos = height / 2; // Keeps the player at the middle

      for (let i = 0; i < platforms.length; i++) {
        platforms[i].yPos += difference; // Moves every platform down
      }
    }

    // NEW PLATFORMS: remove platforms below the screen
    // and add a new one above the highest platform
    for (let i = platforms.length - 1; i >= 0; i--) {
      if (platforms[i].yPos > height) {
        platforms.splice(i, 1); // Removes the platform from the array

        let highest = platforms[platforms.length - 1]; // The last platform is the highest
        let x = random(20, 240);
        let y = highest.yPos - 100; // 100 pixels above the highest
        platforms.push(createPlatform(x, y)); // Adds a new platform of the right type
      }
    }

    for (let i = 0; i < platforms.length; i++) {
      // Checks all platforms
      let platform = platforms[i]; // Gets current platform

      platform.setTheme(theme); // Gives the platform the current world's look
      platform.update(); // Moves the platform (only moving platforms actually move)
      platform.draw(); // Draws the platform

      if (
        player.speedY > 0 && // Player is falling
        previousBottom <= platform.yPos && // Feet were above platform
        player.yPos + player.height >= platform.yPos && // Feet reach platform
        player.xPos + player.width > platform.xPos && // Checks left overlap
        player.xPos < platform.xPos + platform.width // Checks right overlap
      ) {
        // land() decides if we bounce (a broken platform says no)
        if (platform.land() === true) {
          player.yPos = platform.yPos - player.height; // Places player on platform
          player.speedY = -12; // Makes player jump again

          // SCORE: one point per platform, only the first time we land on it
          if (platform.counted === false) {
            score += 1;
            platform.counted = true;
          }
        }
      }
    }

    player.draw(); // Draws the character

    // Shows the score (top left) and the world name (top right)
    fill(255);
    textSize(20);
    textAlign(LEFT, TOP);
    text("Score: " + score, 15, 15);
    textAlign(RIGHT, TOP);
    text(theme.name, width - 15, 15);

    if (player.yPos > height) {
      // Checks if player falls below screen
      if (score > bestScore) {
        bestScore = score; // New personal best!
      }
      gameState = "gameOver"; // Ends the game
    }
  } else if (gameState === "gameOver") {
    drawGameOverScreen(); // Shows game over screen
  }
}

function drawStartScreen() {
  fill(255); // White text
  textAlign(CENTER, CENTER); // Centers text
  textSize(32); // Text size
  text("Doodle Jump", width / 2, 250); // Game title
  drawButton("Start"); // Start button
}

function drawGameOverScreen() {
  fill(255); // White text
  textAlign(CENTER, CENTER); // Centers text
  textSize(32); // Text size
  text("Game Over", width / 2, 250); // Game over message

  textSize(22); // Smaller text for the scores
  text("Score: " + score, width / 2, 300); // This round's score
  text("Best: " + bestScore, width / 2, 330); // Personal best

  drawButton("Play again"); // Restart button
}

function drawButton(label) {
  fill(255, 200, 0); // Yellow button
  rect(buttonX, buttonY, buttonW, buttonH, 10); // Button shape
  fill(0); // Black text
  textSize(20); // Text size
  textAlign(CENTER, CENTER); // Centers the button text
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
    score = 0; // Resets the score FIRST, so we start in the Space world
    createPlatforms(); // Creates new platforms

    player = new Character(130, 600, 45, 45, themes[0].character); // Creates character

    gameState = "playing"; // Starts the game
  }
}

// Connects p5.js functions to the game
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
