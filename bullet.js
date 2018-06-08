var pointCollision = require('point-in-polygon');

function Bullet(shipId, x, y, heading){
  this.id = Math.random();
  this.shipId = shipId;
	this.pos = {x: x, y: y};
  this.heading = heading;
  this.velocity = {x: 0, y:0};

  this.updatePosition = function(){
    this.velocity.x = 1*Math.cos(this.heading);
    this.velocity.y = 1*Math.sin(this.heading);

    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
  }

  this.update = function(){
    this.updatePosition();
  }

  this.isOnPlayField = function(){
    if(this.pos.x > 1000){
      return false;
    }else if(this.pos.x < 0){
      return false;
    }
    if(this.pos.y > 700){
      return false;
    }else if(this.pos.y<0){
      return false;
    }
    return true;
  }

  this.hitsPlayer = function(player){
    if(this.shipId != player.ship.id){
      return pointCollision([this.pos.x, this.pos.y], player.ship.drawPoints);
    }
    return false;
  }

  this.hitsAsteroid = function(asteroid){
    return pointCollision([this.pos.x, this.pos.y], asteroid.drawPoints)
  }

  this.hitsEntity = function(entity){
    var a = this.pos.x - entity.pos.x;
    var b = this.pos.y - entity.pos.y;
    var c = Math.sqrt(a*a + b*b);

    return entity.radius > c;
  }

	return this;
}

Bullet.createFromBullet = function(bullet){
  return {
    pos: bullet.pos
  };
}

if (typeof exports !== 'undefined') {
  module.exports = Bullet;
}
