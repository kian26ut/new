import Platform from "./platform.js"; // The parent class

// A platform that moves left and right (used in the Sky world)
export default class MovingPlatform extends Platform {
  constructor(x, y, width, height, img) {
    super(x, y, width, height, img); // Sets up everything a normal platform has
    this.speedX = 2; // Horizontal speed
  }

  // Keeps its own image no matter which world we are in
  setTheme(theme) {}

  // Moves the platform and turns it around at the canvas edges
  update() {
    this.xPos += this.speedX;

    if (this.xPos < 0 || this.xPos + this.width > width) {
      this.speedX *= -1; // Changes direction
    }
  }
}
