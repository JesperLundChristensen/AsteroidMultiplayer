
var Ship = require('./ship.js');
var Bullet = require('./bullet.js');
var Player = require('./player.js');
var Asteroid = require('./asteroid.js');
var SpawnHandler = require('./SpawnHandler.js');

var express = require('express');
var app = express();

var serv = require('http').Server(app);

app.get('/',function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});
app.use(express.static(__dirname + '/client'));
app.use('/client',express.static(__dirname + '/client'));

serv.listen(process.env.PORT || 2000);
console.log("Server started.");

var colors = ['blue', 'white', 'yellow', 'red', 'green', 'brown', 'magenta', 'orangered', 'pink', 'limegreen'];

var numOfPlayers = 0;

var world;
var spawnHandler = new SpawnHandler();

var gameRunning = false;

var players = {};
var livePlayers = {};
var deadPlayers = {};
var asteroids = [];

var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
	console.log("connected");
	socket.on('play', function(data){
		players[socket.id] = new Player(socket.id, colors.splice(0,1)[0], data.name);
	});

	socket.on('disconnect',function(){
		delete players[socket.id];
	});

	socket.on('rotateClockwise', function(){
		rotateShip(players[socket.id], 0.01);
	});

	socket.on('rotateCounterClockwise', function(){
		rotateShip(players[socket.id], -0.01);
	});

	socket.on('stopRotation', function(){
		rotateShip(players[socket.id], 0);
	});

	socket.on('boost', function(){
		if(players[socket.id].ship != null){
			players[socket.id].ship.setBoost(true);
		}
	});

	socket.on('stopBoost', function(){
		if(players[socket.id].ship != null){
			players[socket.id].ship.setBoost(false);
		}
	});

	socket.on('fire', function(){
		if(players[socket.id].ship != null){
			players[socket.id].ship.fire();
		}
	});

	socket.on('start', function(){
		startGame();
	});
});

setInterval(function(){
	if(gameRunning){
		for (var i = 0; i < asteroids.length; i++) {
			asteroids[i].update();
			for(var key in players){
				if(!players[key].dead){
					if(asteroids[i].hitsPlayer(players[key])){
						killPlayer(players[key]);
					}
				}
			}
		}

		for(var key in players){
			var player = players[key];
			if(!player.dead){
				player.ship.update();
				for(var subkey in players){
					if(!players[subkey].dead && player.ship.hitsPlayer(players[subkey]))
					{
						player.kills++;
						killPlayer(players[subkey]);
					}
				}
				for (var i = 0; i < asteroids.length; i++) {
					if(player.ship.hitsAsteroid(asteroids[i])){
						if(asteroids[i].radius / 2 > 10)
						{
							asteroids.push(new Asteroid(asteroids[i].pos.x+10, asteroids[i].pos.y+10, asteroids[i].radius / 2));
							asteroids.push(new Asteroid(asteroids[i].pos.x-10, asteroids[i].pos.y-10, asteroids[i].radius / 2));
						}
						asteroids.splice(i, 1);
					}
				}
			}
		}
	}
	world = {players, asteroids};
},1000/300);

setInterval(function(){
	if(world){
		io.sockets.emit('update', createUpdatePackage(world));
	}
}, 1000/60);

function killPlayer(player){
	player.killShip();
	player.deaths++;
}

function rotateShip(player, angle){
	if(player.ship != null){
		player.ship.setRotation(angle);
	}
}

function createUpdatePackage(world){
	return {
		players: populatePlayers(world.players),
		asteroids: populateAsteroids(world.asteroids)
	};
}

function populateAsteroids(asteroids){
  asteroidsToReturn = [];
  for (var i = 0; i < asteroids.length; i++) {
    asteroidsToReturn.push(Asteroid.createFromAsteroids(asteroids[i]));
  }
  return asteroidsToReturn;
}

function populatePlayers(players){
  playersToReturn = {};
  for (key in players) {
    playersToReturn[key] = Player.createFromPlayer(players[key]);
  }
  return playersToReturn;
}

function clearWorld(){
	asteroids = [];
}

function createAsteroids(){
	for(var i = 0; i < 5; i++){
		asteroids.push(new Asteroid());
	}
}

function respawnShips(){
	for (key in players) {
		players[key].respawnShip(spawnHandler.getSpawn());
	}
}

function startGame(){
	gameRunning = false;

	clearWorld();
	createAsteroids();
	respawnShips();

	gameRunning = true;
}
