var Ship = require('./ship.js');
var Bullet = require('./bullet.js');
var Player = require('./player.js');
var Asteroid = require('./asteroid.js');
var SpawnHandler = require('./SpawnHandler.js');

var polygonsIntersect = require('polygons-intersect');

var fs = require('fs');
var express = require('express');
var app = express();

var serv = require('http').Server(app);

app.get('/',function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});
app.use(express.static(__dirname + '/client'));
app.use('/client',express.static(__dirname + '/client'));

serv.listen(process.env.PORT || 80);
console.log("Server started.");

var colors = ['blue', 'white', 'yellow', 'red', 'green', 'brown', 'magenta', 'orangered', 'pink', 'limegreen'];

var world;
var spawnHandler = new SpawnHandler();

var gameRunning = false;
var startTime;
var roundNumber = 0;
var roundTime = 33000;

var players = {};
var asteroids = [];
var timer = 0;

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
		rotateShip(players[socket.id], 0.02);
	});

	socket.on('rotateCounterClockwise', function(){
		rotateShip(players[socket.id], -0.02);
	});

	socket.on('stopRotation', function(){
		rotateShip(players[socket.id], 0);
	});

	socket.on('boost', function(){
		if(players[socket.id] != null && players[socket.id].ship != null){
			players[socket.id].ship.setBoost(true);
		}
	});

	socket.on('stopBoost', function(){
		if(players[socket.id] != null && players[socket.id].ship != null){
			players[socket.id].ship.setBoost(false);
		}
	});

	socket.on('fire', function(){
		if(players[socket.id] != null && players[socket.id].ship != null){
			players[socket.id].ship.fire();
		}
	});

	socket.on('start', function(){
		startGame();
	});
});

setInterval(function(){
	if(gameRunning){
		if(shouldEndRound())
		{
			endRound();
		}
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
						destroyAsteroid(asteroids[i], player, i);
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

function destroyAsteroid(asteroid, player, i){
	io.sockets.emit('asteroidsDestroyed', asteroid.pos);

	player.asteroidsDestroyed++;
	if(asteroid.radius / 2 > 10)
	{
		asteroids.push(new Asteroid({x:asteroid.pos.x+10, y:asteroid.pos.y+10}, asteroid.radius / 2));
		asteroids.push(new Asteroid({x:asteroid.pos.x-10, y:asteroid.pos.y-10}, asteroid.radius / 2));
	}
	asteroids.splice(i, 1);
}

function killPlayer(player){
	io.sockets.emit('shipDestroyed', player.ship.pos);

	player.killShip();
	player.deaths++;
}

function rotateShip(player, angle){
	if(player != null && player.ship != null){
		player.ship.setRotation(angle);
	}
}

function createUpdatePackage(world){
	if(gameRunning)
	{
		timer = (roundTime-(Date.now()-startTime))/1000;
	}

	return {
		players: populatePlayers(world.players),
		asteroids: populateAsteroids(world.asteroids),
		roundNumber: roundNumber,
		timeRemaining: Math.floor(timer),
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
	for(var i = 0; i < 15-Object.keys(players).length; i++){
		asteroids.push(new Asteroid(spawnHandler.getSpawn()));
	}
}

function respawnShips(){
	for (key in players) {
		players[key].respawnShip(spawnHandler.getSpawn());
	}
}

function shouldEndRound(){
	if((Date.now() - startTime) >= roundTime)
	{
		return true;
	}

	var alive=0;
	for(var key in players){
		if(!players[key].dead){
			alive++;
			if(alive > 1){
				return false;
			}
		}
	}
	return true;
}

function endRound(){
	gameRunning = false;

	saveScore();
}

function saveScore(){
	var scores = {};
	for(var key in players){
		var player = players[key];
		scores[player.id] = {name: player.name, kills: player.kills, deaths: player.deaths, asteroidsDestroyed: player.asteroidsDestroyed, points: player.points};
	}
		fs.writeFile('scores.json', JSON.stringify(scores), 'utf8', function(err){
		if(err){
			throw err;
		}
	});
}

function startGame(){
	gameRunning = false;
	startTime = Date.now();

	roundNumber++;

	clearWorld();
	spawnHandler.shuffleSpawnLocations(); //randomfunc
	createAsteroids();
	respawnShips();

	gameRunning = true;
}
