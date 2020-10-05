var socket = require('socket.io-client')('http://localhost:2000');
var gameData;

socket.on("connect", function(){
  socket.emit("play", {name: "Jesper-NodeJS"});
})
socket.on("update", function (data) {
  gameData = data;
});


setInterval(function(){
  if(gameData){
		socket.emit('boost');
    if(Math.floor(Math.random() * 2) == 0)
    {
      socket.emit("rotateCounterClockwise");
    }
    else {
      socket.emit("rotateClockwise");
    }
  }
}, 1000);
