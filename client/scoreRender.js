function ScoreRender(){
}
ScoreRender.render = function(players, roundNumber){
  ScoreRender.clearTable();

  ScoreRender.drawroundNumber(roundNumber);

  var sortableArray = ScoreRender.sortPlayerData(players);

  for(var i = 0; i < sortableArray.length; i++){
    ScoreRender.createPlayerDataRow(sortableArray[i], select("#scores"));
  }
}

ScoreRender.sortPlayerData = function(players)
{
  var sortableArray = [];
  for(var key in players){
    sortableArray.push(players[key]);
  }

  sortableArray.sort(function(a,b){
    if(a.points < b.points){
      return 1;
    }
    if(a.points > b.points){
      return -1;
    }
    return 0;
  });

  return sortableArray;
}

ScoreRender.createPlayerDataRow = function(player, table){
  var tr = createElement('tr', '');
  tr.parent(table);

  var playerColor = createElement('td', '').parent(tr);
  playerColor.addClass('square');
  playerColor.style('background', player.color);

  var name = player.name;
  if(player.dead){
    name = "✝ " + player.name;
  }

  var nameTd = createElement('td', name).parent(tr);
  nameTd.style('font-color', player.color);

  createElement('td', player.kills).parent(tr);
  createElement('td', player.deaths).parent(tr);
  createElement('td', player.asteroidsDestroyed).parent(tr);
  createElement('td', player.points).parent(tr);
}

ScoreRender.drawroundNumber = function(roundNumber){
  var h1 = select("#roundNumber");
  h1.html("Round: " + roundNumber);
}

ScoreRender.clearTable = function(){
  var tableElement = document.getElementById('scores');
  while(tableElement.rows.length > 1) {
    tableElement.deleteRow(1);
  }
}
