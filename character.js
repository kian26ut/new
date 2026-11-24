let characterImage; // Stores the character image
let player; // Stores the player character

function preload() {
  // Loads files before the game starts
  characterImage = loadImage("assets/doodlejump-character-03.png"); // Loads the character image
}

function setup() {
  // Runs once when the game starts
  createCanvas(360, 776); // Creates the game canvas
  player = new Character(130, 600, 80, 80); // Creates the player with position and size
}

function draw() {
  // Runs continuously while the game is active
  background(220); // Draws a light grey background
  player.move(); // Updates the player's movement
  player.draw(); // Draws the player on the canvas
}

class Character {
  // Creates a class for the character
  constructor(x, y, width, height) {
    // Sets the character's starting values
    this.xPos = x; // Sets the horizontal position
    this.yPos = y; // Sets the vertical position
    this.width = width; // Sets the character's width
    this.height = height; // Sets the character's height
    this.speedY = -12; // Starts the character's upward movement
    this.gravity = 0.5; // Pulls the character down
  }

  draw() {
    // Draws the character
    image(characterImage, this.xPos, this.yPos, this.width, this.height); // Displays the character image
  }

  move() {
    // Controls the character's movement
    if (keyIsDown(LEFT_ARROW)) {
      // Checks if left is pressed
      this.xPos -= 5; // Moves left
    }

    if (keyIsDown(RIGHT_ARROW)) {
      // Checks if right is pressed
      this.xPos += 5; // Moves right
    }

    this.yPos += this.speedY; // Moves the character vertically
    this.speedY += this.gravity; // Applies gravity

    if (this.yPos + this.height >= height) {
      // Checks if the character hits the bottom
      this.yPos = height - this.height; // Keeps the character inside the canvas
      this.speedY = -12; // Makes the character jump again
    }
  }
}
