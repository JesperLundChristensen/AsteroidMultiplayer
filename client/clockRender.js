function ClockRender(){
}
ClockRender.render = function(timeRemaining){
  push();
  textSize(32);
  fill('white');
  text(timeRemaining, 25, 30);
  pop();
}
