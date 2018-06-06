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
		socket.emit("rotateCounterClockwise");
		socket.emit("fire");
    if(Math.floor(Math.random() * 2) == 0)
    {
      socket.emit('boost');
    }
    else {
      socket.emit('stopBoost');
    }
  }
}, 1000);
