function AsteroidRender(){
}
AsteroidRender.render = function(asteroid){
  push();
  stroke(255);
  noFill();
  
  beginShape();
    for (var i = 0; i < asteroid.drawPoints.length; i++) {
      vertex(asteroid.drawPoints[i].x, asteroid.drawPoints[i].y);
    }
  endShape(CLOSE);

  pop();
}
