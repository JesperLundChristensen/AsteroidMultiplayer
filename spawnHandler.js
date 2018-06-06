function SpawnHandler()
{
  var spawns = [{x: 100, y:200},
  							{x: 105, y:500},
  							{x: 300, y:200},
  							{x: 305, y:500},
  							{x: 500, y:200},
  							{x: 505, y:500},
  							{x: 700, y:500},
  							{x: 705, y:200},
  							{x: 900, y:500},
  							{x: 905, y:200}];
  var next = 0;
  var maxSpawns = 10;

  this.getSpawn = function(){
    var spawn = spawns[next];
    next++;
    if(next > 9)
    {
      next = 0;
    }
    return spawn;
  }
}

if (typeof exports !== 'undefined') {
  module.exports = SpawnHandler;
}
