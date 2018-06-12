var polygonsIntersect = require('polygons-intersect');

function Asteroid(pos, radius){
  if(radius){
    this.radius = radius;
  }else{
    this.radius = (Math.random()*50)+20;
  }
  if(pos){
    this.pos = pos;
  }else{
    this.pos = {x: Math.random()*250, y:Math.random()*250};
  }

  this.velocity = {x: Math.random()*0.2, y:Math.random()*0.2};

  this.total = 10;
  this.drawPoints = [];
  this.offsets = [];
  for (var i = 0; i < this.total; i++) {
    this.offsets.push(Math.floor(Math.random() * 25) - 10);
  }

  this.updatePosition = function(){
    this.drawPoints = [];

    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;

    for (var i = 0; i < this.total; i++) {
      var angle = 360/this.total*i;
      var r = this.radius + this.offsets[i];
      var x = (r * Math.cos(angle * Math.PI / 180)) + this.pos.x;
      var y = (r * Math.sin(angle * Math.PI / 180)) + this.pos.y;

      this.drawPoints.push({x: x, y: y});
    }
  }

  this.update = function(){
    this.updatePosition();
    this.edges();
  }

  this.hitsPlayer = function(player){
    return polygonsIntersect(this.drawPoints, player.ship.drawPoints).length > 0;
  }

  this.edges = function(){
    if(this.pos.x > 1000 + this.radius){
      this.pos.x = -this.radius;
    }else if(this.pos.x < -this.radius){
        this.pos.x = 1000 + this.radius;
    }
    if(this.pos.y > 700 + this.radius){
      this.pos.y = -this.radius;
    }else if(this.pos.y < -this.radius){
        this.pos.y = 700 + this.radius;
    }
  }
	return this;
}

Asteroid.createFromAsteroids = function(asteroid){
  return {
    pos: asteroid.pos,
    drawPoints: asteroid.drawPoints,
  };
}

if (typeof exports !== 'undefined') {
  module.exports = Asteroid;
}
