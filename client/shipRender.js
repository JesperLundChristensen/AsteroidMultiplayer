function ShipRender(){

}

ShipRender.render = function(ship){
  if(ship == null){
    return;
  }

  for(var i = 0; i < ship.bullets.length; i++){
    BulletRender.render(ship.bullets[i]);
  }

  push();

  fill(ship.color);
  ellipse(ship.pos.x, ship.pos.y, 5);

  stroke(256);
  beginShape();
  for (var i = 0; i < ship.drawPoints.length; i++) {
    vertex(ship.drawPoints[i].x, ship.drawPoints[i].y);
  }
  endShape(CLOSE);

  fill(ship.color)
  ellipse(ship.drawPoints[0].x, ship.drawPoints[0].y, 7);
  if(ship.isBoosting){
    fill("yellow");
    ellipse((ship.drawPoints[1].x + ship.drawPoints[2].x)/2, (ship.drawPoints[1].y + ship.drawPoints[2].y)/2, 7);
  }

  pop();
}
