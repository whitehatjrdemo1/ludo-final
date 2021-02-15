class mySprite {
  constructor(x, y, width, height, imagePath) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = "grey";
    this.active = false;
    this.depth = 0;

    this.image = loadImage(imagePath);
  }
  display() {
    push();
    imageMode(CENTER);

    image(this.image, this.x, this.y, this.width, this.height);
    pop();
  }
  isClicked() {
    if (
      this.x + this.width / 2 > mouseX &&
      this.x - this.width / 2 < mouseX &&
      this.y + this.height / 2 > mouseY &&
      this.y - this.height / 2 < mouseY
    ) {
      return true;
    }
  }
}
