var Bullet = require('./bullet.js');

function Ship(color, pos){
  this.id = Math.random();
  this.radius = 15;
	this.pos = pos;
  this.frontPoint;
  this.drawPoints = [];
  this.heading = 0;
  this.rotation = 0;
  this.velocity = {x: 0, y:0};
  this.isBoosting = false;
  this.color = color;

  this.bullets = [];

  this.lastfire = 0;

  this.updatePosition = function(){
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;

    this.updateDrawPoints();
  }

  this.updateDrawPoints = function(){
    var front = {x:0, y:0};
    var left = {x:0, y:0};
    var right = {x:0, y:0};

    front.x = this.pos.x + this.radius*Math.cos(this.heading);
    front.y = this.pos.y + this.radius*Math.sin(this.heading);
    left.x = this.pos.x + this.radius*Math.cos(this.heading + (120*Math.PI/180))
    left.y = this.pos.y + this.radius*Math.sin(this.heading + (120*Math.PI/180))
    right.x = this.pos.x + this.radius*Math.cos(this.heading - (120*Math.PI/180))
    right.y = this.pos.y + this.radius*Math.sin(this.heading - (120*Math.PI/180))

    this.drawPoints = [front, left, right];
    this.frontPoint = front;
  }

  this.fire = function(){
    if(!this.dead && this.frontPoint){
      if (new Date() - this.lastfire < 2000){
        return;
      }
      this.lastfire = new Date();
      var bullet = new Bullet(this.id, this.frontPoint.x, this.frontPoint.y, this.heading);
      this.bullets.push(bullet);
    }
  }

  this.setBoost = function(b){
    this.isBoosting = b;
  }

  this.boost = function(){
    if(this.isBoosting){
      var angle = this.heading;

      this.velocity.x += 0.0015*Math.cos(angle);
      this.velocity.y += 0.0015*Math.sin(angle);
    }
  }
  this.update = function(){
    this.boost();
    this.turn();
    this.edges();
    this.updatePosition();
    this.updateBullets();
  }

  this.hitsAsteroid = function(asteroid){
    for(var i = 0; i < this.bullets.length; i++){
        var hit = this.bullets[i].hitsAsteroid(asteroid);
        if(hit)
        {
          this.bullets.splice(i,1);
          return true;
        }
    }
    return false;

  }

  this.hitsPlayer = function(player){
    for(var i = 0; i < this.bullets.length; i++){
        var hit = this.bullets[i].hitsPlayer(player);
        if(hit)
        {
          this.bullets.splice(i, 1);
          return true;
        }
    }
    return false;
  }

  this.updateBullets = function(){
    for(var i = 0; i < this.bullets.length; i++){
      if(!this.bullets[i].isOnPlayField()){
        this.bullets.splice(i, 1);
      }else{
        this.bullets[i].update();
      }
    }
  }

  this.setRotation = function(angle){
    this.rotation = angle;
  }

  this.turn = function(){
    this.heading += this.rotation;
  }

  this.edges = function(){
    if(this.pos.x > 1000 + this.radius){
      this.pos.x = -this.radius;
    }else if(this.pos.x < -this.radius){
        this.pos.x = 1000 + this.radius;
    }
    if(this.pos.y > 700 + this.radius){
      this.pos.y = -this. radius;
    }else if(this.pos.y < -this.radius){
        this.pos.y = 700 + this.radius;
    }
  }
	return this;
}

Ship.createFromShip = function(ship){
  if(ship){
    var bullets = [];
    for (var i = 0; i < ship.bullets.length; i++) {
      bullets.push(Bullet.createFromBullet(ship.bullets[i]));
    }

    var data = {
      id: ship.id,
      pos: ship.pos,
      radius: ship.radius,
      heading: ship.heading,
      isBoosting: ship.isBoosting,
      color: ship.color,
      drawPoints: ship.drawPoints,
      bullets: bullets
    }
    return data;
  }
  return null;
}

if (typeof exports !== 'undefined') {
  module.exports = Ship;
}
