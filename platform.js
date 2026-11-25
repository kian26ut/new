export default class Platform {
  // Creates the platform class

  constructor(x, y, width, height) {
    // Sets the platform's values
    this.xPos = x; // Horizontal position
    this.yPos = y; // Vertical position
    this.width = width; // Platform width
    this.height = height; // Platform height
    this.counted = false; // Has the player already scored on this platform?

    this.platformImage = loadImage("assets/doodlejump-platform.png"); // Loads the platform image
  }

  draw() {
    // Draws the platform
    image(this.platformImage, this.xPos, this.yPos, this.width, this.height); // Displays the platform image
  }
}
