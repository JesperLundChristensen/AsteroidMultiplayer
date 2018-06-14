function ShipRender(){
  this.particles = [];

  this.render = function(players){
    for(var key in players){
      if(!players[key].dead){
        this.drawShip(players[key].ship);
      }
    }
  }

  this.drawShip = function(ship){
    if(ship){
      this.drawBullets(ship.bullets);

      push();
      this.drawHullOfShip(ship);
      this.drawFrontOfShip(ship);
      this.drawBoost(ship);
      pop();
    }
  }

  this.drawHullOfShip = function(ship){
    fill(ship.color);
    stroke(256);
    beginShape();
    for (var i = 0; i < ship.drawPoints.length; i++) {
      vertex(ship.drawPoints[i].x, ship.drawPoints[i].y);
    }
    endShape(CLOSE);
  }

  this.drawFrontOfShip = function(ship){
    fill(ship.color)
    ellipse(ship.drawPoints[0].x, ship.drawPoints[0].y, 7);
  }

  this.drawBoost = function (ship){
    if(ship.isBoosting){
      fill("yellow");
      ellipse((ship.drawPoints[1].x + ship.drawPoints[2].x)/2, (ship.drawPoints[1].y + ship.drawPoints[2].y)/2, 7);

      this.createNewParticles((ship.drawPoints[1].x + ship.drawPoints[2].x)/2, (ship.drawPoints[1].y + ship.drawPoints[2].y)/2, ship);
    }
    this.drawParticles();
  }

  this.drawParticles = function(){
    for(var i = 0; i < this.particles.length; i++){
      this.particles[i].update();
      this.particles[i].show();
      if (this.particles[i].finished()) {
        this.particles.splice(i, 1);
      }
    }
  }

  this.createNewParticles = function(x, y, ship){
    for(var i = 0; i < 5; i++){
      this.particles.push(new Particle(3, x, y, ship.heading-Math.PI+random(-1, 1), 255, 204, 0));
    }
  }

  this.drawBullets = function(bullets){
    for(var i = 0; i < bullets.length; i++){
      BulletRender.render(bullets[i]);
    }
  }
}
