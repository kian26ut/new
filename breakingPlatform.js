import Platform from "./platform.js"; // The parent class

// A platform that breaks after being jumped on once (used in the Hell world)
export default class BreakingPlatform extends Platform {
  constructor(x, y, width, height, img) {
    super(x, y, width, height, img); // Sets up everything a normal platform has
    this.broken = false; // Starts in one piece
  }

  // Keeps its own image no matter which world we are in
  setTheme(theme) {}

  // Only draws the platform if it isn't broken
  draw() {
    if (this.broken === false) {
      super.draw(); // Uses the normal platform's draw method
    }
  }

  // The first landing gives a bounce and breaks the platform.
  // After that, the player falls straight through.
  land() {
    if (this.broken === true) {
      return false;
    }
    this.broken = true;
    return true;
  }
}
s;
