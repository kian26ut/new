export default class Character {
  // Creates the character class

  constructor(x, y, width, height, img) {
    // Sets starting values
    this.xPos = x; // Horizontal position
    this.yPos = y; // Vertical position
    this.width = width; // Character width
    this.height = height; // Character height
    this.characterImage = img; // Stores the character image

    this.speedY = -12; // Starting jump speed
    this.gravity = 0.5; // Gravity pulls the character down
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
      // Checks right boundary
      this.xPos = width - this.width; // Stops at right edge
    }

    this.yPos += this.speedY; // Moves the character vertically
    this.speedY += this.gravity; // Applies gravity
  }
}
