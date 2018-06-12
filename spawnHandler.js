function SpawnHandler()
{
  var spawns = [];
  for(var i = 0; i<5; i++){
    for(var j = 0; j<4; j++){
      randomX = Math.floor(Math.random() * 40) + 1;
      randomY = Math.floor(Math.random() * 40) + 1;
      spawns.push({x: 100 + randomX + (i*200), y: 100 + randomY + (150*j)});
    }
  }
  spawns.sort(function() {
    return .5 - Math.random();
  });

  var next = 0;

  this.getSpawn = function(){
    var spawn = spawns[next];
    next++;
    {
      if(next == spawns.length)
      next = 0;
    }

    return {x: spawn.x, y: spawn.y};
  }
}

if (typeof exports !== 'undefined') {
  module.exports = SpawnHandler;
}
