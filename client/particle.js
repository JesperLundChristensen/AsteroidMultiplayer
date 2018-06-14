class Particle {
  constructor(size, x, y, heading, r, g, b) {
    this.x = x;
    this.y = y;
    this.vx = 1*Math.cos(heading);
    this.vy = 1*Math.sin(heading);

    this.size = size;
    this.r = r;
    this.g = g;
    this.b = b;

    this.alpha = 255;
  }

  finished() {
    return this.alpha < 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 5;
  }

  show() {
    noStroke();
    fill(color(this.r, this.g, this.b, this.alpha));
    ellipse(this.x, this.y, this.size);
  }

}
