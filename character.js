export default class Character {
  // Creates the character class

<<<<<<< HEAD
function preload() {
  // Loads files before the game starts
  characterImage = loadImage("assets/doodlejump-character.png"); // Loads the character image
}

function setup() {
  // Runs once when the game starts
  createCanvas(360, 776); // Creates the game canvas
  player = new Character(130, 600, 40, 48); // Creates the player with position and size
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
=======
  constructor(x, y, width, height, img) {
    // Sets starting values
    this.xPos = x; // Horizontal position
    this.yPos = y; // Vertical position
    this.width = width; // Character width
    this.height = height; // Character height
    this.characterImage = img; // Stores the character image

    this.speedY = -12; // Starting jump speed
    this.gravity = 0.5; // Gravity pulls the character down
>>>>>>> 1d3e71ff82fa675b331e5432669f9adc647ee7de
  }

  draw() {
    // Draws the character
    image(this.characterImage, this.xPos, this.yPos, this.width, this.height); // Displays the image
  }

  move() {
    // Controls character movement

    if (keyIsDown(LEFT_ARROW)) {
      // Checks if left arrow is pressed
      this.xPos -= 3; // Moves left
    }

    if (keyIsDown(RIGHT_ARROW)) {
      // Checks if right arrow is pressed
      this.xPos += 3; // Moves right
    }

    if (this.xPos < 0) {
      // Checks left boundary
      this.xPos = 0; // Stops at left edge
    }

    if (this.xPos + this.width > width) {
<<<<<<< HEAD
      // right
      this.xPos = width - this.width;
=======
      // Checks right boundary
      this.xPos = width - this.width; // Stops at right edge
>>>>>>> 1d3e71ff82fa675b331e5432669f9adc647ee7de
    }

    this.yPos += this.speedY; // Moves the character vertically
    this.speedY += this.gravity; // Applies gravity
  }
}
