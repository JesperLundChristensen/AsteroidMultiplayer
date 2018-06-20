function DestroyedAsteroidsRender(){
  this.particles = [];

  this.alreadyRendered = [];

  this.render = function(destroyedAsteroids){
    push();
    for (var i = 0; i < destroyedAsteroids.length; i++) {
      if(this.alreadyRendered.map(function(pos){return pos.x + ":" + pos.y}).indexOf(destroyedAsteroids[i].x + ":" + destroyedAsteroids[i].y) == -1)
      {
        this.createNewParticles(destroyedAsteroids[i]);
        this.alreadyRendered.push(destroyedAsteroids[i]);
      }
    }
    this.drawParticles();
    pop();
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

  this.createNewParticles = function(pos){
    for(var i = 0; i < 25; i++){
      this.particles.push(new Particle(5, pos.x+random(-20, 20), pos.y+random(-20, 20), random(0, Math.PI*2), color(192, 192, 192), 1.5));
    }
  }
}
