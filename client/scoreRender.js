function ScoreRender(){
}
ScoreRender.render = function(players){
  var xOffset = 0;
  push();
  textSize(16);
  fill('white');
  text('Name', 700, 20+xOffset);
  text('K', 840, 20+xOffset);
  text('D', 860, 20+xOffset);
  text('Points', 880, 20+xOffset);
  for(var key in players){
    player = players[key];

    xOffset += 25;

    fill(player.color);
    text(player.name, 700, 20+xOffset);
    text(player.kills, 840, 20+xOffset);
    text(player.deaths, 860, 20+xOffset);
    text(player.kills/player.deaths, 880, 20+xOffset);

  }
  pop();
}
