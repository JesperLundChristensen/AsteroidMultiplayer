function BulletRender(bullet){
}
BulletRender.render = function(bullet){
  push();
  stroke(255);
  strokeWeight(4);
  point(bullet.pos.x, bullet.pos.y);
  pop();
}
