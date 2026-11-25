// A normal platform. The other platform types build on this class.
export default class Platform {
  constructor(x, y, width, height, img) {
    this.xPos = x; // Horizontal position
    this.yPos = y; // Vertical position
    this.width = width; // Platform width
    this.height = height; // Platform height
    this.img = img; // Platform image
    this.counted = false; // Has the player already scored on this platform?
  }

  // Normal platforms don't move, so update does nothing
  update() {}

  // Draws the platform
  draw() {
    image(this.img, this.xPos, this.yPos, this.width, this.height);
  }

  // Runs when the player lands on the platform.
  // Returns true if the player should bounce.
  land() {
    return true;
  }
}
