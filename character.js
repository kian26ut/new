// The player's character
export default class Character {
  constructor(x, y, width, height, img) {
    this.xPos = x; // Horizontal position
    this.yPos = y; // Vertical position
    this.width = width; // Character width
    this.height = height; // Character height
    this.characterImage = img; // Character image (changes with the world)

    this.speedY = -12; // Starting jump speed
    this.gravity = 0.5; // Gravity pulls the character down
  }

  // Draws the character
  draw() {
    image(this.characterImage, this.xPos, this.yPos, this.width, this.height);
  }

  // Controls character movement
  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.xPos -= 3; // Moves left
    }

    if (keyIsDown(RIGHT_ARROW)) {
      this.xPos += 3; // Moves right
    }

    if (this.xPos < 0) {
      this.xPos = 0; // Stops at left edge
    }

    if (this.xPos + this.width > width) {
      this.xPos = width - this.width; // Stops at right edge
    }

    this.yPos += this.speedY; // Moves the character vertically
    this.speedY += this.gravity; // Applies gravity
  }
}
