var socket = require('socket.io-client')('http://localhost:2000');
var gameData;

socket.on("connect", function(){
  socket.emit("play", {name: "asteroid killer"});
})
socket.on("update", function (data) {
  gameData = data;
});


setInterval(function(){
  if(gameData){
    var myShip;
    if(gameData.players[socket.id])
    {
      myShip = gameData.players[socket.id].ship;
    }
    if(myShip)
    {
      var length = 9999;
      var newBearing = 0;
      for(var i = 0; i < gameData.asteroids.length; i++)
      {
        var asteroid = gameData.asteroids[i];
        var a = asteroid.pos.y - myShip.pos.y;
        var b = asteroid.pos.x - myShip.pos.x;

        var newLength = Math.sqrt( a*a + b*b );
        if(newLength < length)
        {
          length = newLength;
          newBearing = Math.atan2(a, b);
        }
      }
      if(newBearing > myShip.heading)
      {
        socket.emit("rotateClockwise");
      }
      else
      {
        socket.emit("rotateCounterClockwise");
      }
      socket.emit("fire");
    }
  }
}, 100);
