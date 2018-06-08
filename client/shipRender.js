function ShipRender(){

}

ShipRender.render = function(ship){
  if(ship == null){
    return;
  }
  for(var i = 0; i < ship.bullets.length; i++){
    BulletRender.render(ship.bullets[i]);
  }
  /*push();
  translate(ship.pos.x, ship.pos.y);
  rotate(ship.heading + PI /  2);
  fill(ship.color);
  triangle(-ship.radius, ship.radius, ship.radius, ship.radius, 0, -ship.radius);

  if(ship.isBoosting){
    fill("yellow");
    ellipse(0, ship.radius+5, 5);
  }

  pop();
*/
  push();
  fill(ship.color);
  stroke(256);
  beginShape();
    for (var i = 0; i < ship.drawPoints.length; i++) {
      vertex(ship.drawPoints[i].x, ship.drawPoints[i].y);
    }
  endShape(CLOSE);

  pop();
}
