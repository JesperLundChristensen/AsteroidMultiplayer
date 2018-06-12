function ScoreRender(){
}
ScoreRender.render = function(players){
  var sortableArray = [];
  for(var key in players){
    sortableArray.push(players[key]);
  }

  var yOffset = 0;
  push();
  textSize(16);
  fill('white');
  text('Name', 780, 20+yOffset);
  text('K', 920, 20+yOffset);
  text('D', 940, 20+yOffset);
  text('A', 960, 20+yOffset);
  text('P', 980, 20+yOffset);

  sortableArray.sort(function(a,b){
    if(a.points < b.points){
      return 1;
    }
    if(a.points > b.points){
      return -1;
    }
    return 0;
  });

  for(var i = 0; i < sortableArray.length; i++){
    player = sortableArray[i];

    yOffset += 25;

    fill(player.color);
    if(player.dead){
      textSize(28);
      textStyle("bold");
      text('✝', 760, 20+yOffset);
    }
    textStyle("normal");
    textSize(16);
    text(player.name.substring(0, 14) + "...", 780, 20+yOffset);
    text(player.kills, 920, 20+yOffset);
    text(player.deaths, 940, 20+yOffset);
    text(player.asteroidsDestroyed, 960, 20+yOffset);
    text(player.points, 980, 20+yOffset);
  }
  pop();
}
