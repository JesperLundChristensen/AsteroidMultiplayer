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
  translate(ship.pos.x, ship.pos.y);
  rotate(ship.heading + PI /  2);
  fill(ship.color);
  triangle(-ship.radius, ship.radius, ship.radius, ship.radius, 0, -ship.radius);
  pop();
}
