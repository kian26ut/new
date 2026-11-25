export default class Character {
  // Creates the character class

  constructor(x, y, width, height, img) {
    // Sets starting values
    this.xPos = x; // Horizontal position
    this.yPos = y; // Vertical position
    this.width = width; // Character width
    this.height = height; // Character height
    this.characterImage = img; // Character image

    this.speedY = -12; // Starting jump speed
    this.gravity = 0.5; // Gravity pulls the character down

    this.squishFrames = 0; // Counts the squish animation frames
  }

  draw() {
    // Draws the character
    let drawWidth = this.width; // Normal width
    let drawHeight = this.height; // Normal height

    if (this.squishFrames > 0) {
      // Checks if squish is active
      drawWidth = this.width * 1.2; // Makes character 20% wider
      drawHeight = this.height * 0.8; // Makes character 20% shorter
      this.squishFrames--; // Counts down the animation
    }

    let drawX = this.xPos - (drawWidth - this.width) / 2; // Centers character horizontally
    let drawY = this.yPos + this.height - drawHeight; // Keeps feet in place

    image(this.characterImage, drawX, drawY, drawWidth, drawHeight); // Displays character
  }

  move() {
    // Controls character movement

    if (keyIsDown(LEFT_ARROW)) {
      // Checks left arrow
      this.xPos -= 3; // Moves left
    }

    if (keyIsDown(RIGHT_ARROW)) {
      // Checks right arrow
      this.xPos += 3; // Moves right
    }

    if (this.xPos < 0) {
      // Checks left edge
      this.xPos = 0; // Stops at left edge
    }

    if (this.xPos + this.width > width) {
      // Checks right edge
      this.xPos = width - this.width; // Stops at right edge
    }

    this.yPos += this.speedY; // Moves vertically
    this.speedY += this.gravity; // Applies gravity
  }
}
