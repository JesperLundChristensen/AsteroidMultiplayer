function AsteroidRender(){
  this.render = function(asteroid){
    push();
    stroke(255);
    noFill();

    beginShape();
      for (var i = 0; i < asteroid.drawPoints.length; i++) {
        vertex(asteroid.drawPoints[i].x, asteroid.drawPoints[i].y);
      }
    endShape(CLOSE);

    pop();
  }/*
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
  }*/
}
