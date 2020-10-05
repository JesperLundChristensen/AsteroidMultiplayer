function Particle(size, x, y, heading, definedColor, speed) {
  if(!speed){
    speed = 1;
  }

  this.x = x;
  this.y = y;
  this.vx = speed*Math.cos(heading);
  this.vy = speed*Math.sin(heading);

  this.size = size;
  this.definedColor = definedColor;
  this.definedColor.setAlpha(255);

  this.finished = function() {
    return alpha(this.definedColor) < 0;
  }

  this.update = function() {
    this.x += this.vx;
    this.y += this.vy;
    this.definedColor.setAlpha(alpha(this.definedColor)-5);
  }

  this.show = function() {
    noStroke();
    fill(this.definedColor);
    ellipse(this.x, this.y, this.size);
  }
}
