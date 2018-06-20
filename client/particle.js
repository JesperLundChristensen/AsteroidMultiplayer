function Particle(size, x, y, heading, definedColor, speed) {
  if(!speed){
    speed = 1;
  }

  this.x = x;
  this.y = y;
  this.vx = speed*Math.cos(heading);
  this.vy = speed*Math.sin(heading);

  this.size = size;
  this.color = definedColor;
  color(100, 50, 150);
  this.color.setAlpha(255);

  this.finished = function() {
    return alpha(this.color) < 0;
  }

  this.update = function() {
    this.x += this.vx;
    this.y += this.vy;
    this.color.setAlpha(alpha(this.color)-5);
  }

  this.show = function() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }
}
