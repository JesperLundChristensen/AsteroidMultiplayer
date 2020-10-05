function ExplosionRender(definedColor){
  this.particles = [];

  this.definedColor = definedColor;

  this.render = function(positions){
    push();
    for (var i = 0; i < positions.length; i++) {
      this.createNewParticles(positions[i]);
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
      this.particles.push(new Particle(5, pos.x+random(-20, 20), pos.y+random(-20, 20), random(0, Math.PI*2), color(this.definedColor), 1.5));
    }
  }
}
