
var WIDTH = 1000;
var HEIGHT = 700;
var socket = io();

var world;
var shipsDestroyed = [];
var asteroidsDestroyed = [];

var shipRender = new ShipRender();
var asteroidRender = new AsteroidRender();
var asteroidExplosionRender = new ExplosionRender("grey");
var shipExplosionRender = new ExplosionRender("yellow");

var lastDataDrawn = 0;

function setup(){
  var canvas = createCanvas(WIDTH, HEIGHT);
  canvas.position(300, 10);
  background(0);
  frameRate(60);

  socket.on('update', function(data){
    {
      world = data;
    }
  });

  socket.on('shipDestroyed', function(data){
    shipsDestroyed.push(data);
  });

  socket.on('asteroidsDestroyed', function(data){
    asteroidsDestroyed.push(data);
  });
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    socket.emit('boost');
  } else if (keyCode === DOWN_ARROW) {
    socket.emit('fire');
  } else if (keyCode === LEFT_ARROW) {
    socket.emit('rotateCounterClockwise');
  } else if (keyCode === RIGHT_ARROW) {
    socket.emit('rotateClockwise');
  }
}

function keyReleased(){
  if (keyCode === UP_ARROW) {
    socket.emit('stopBoost');
  } else if (keyCode === DOWN_ARROW) {

  } else if (keyCode === LEFT_ARROW) {
    socket.emit('stopRotation');
  } else if (keyCode === RIGHT_ARROW) {
    socket.emit('stopRotation');
  }
}

function joinGame(){
  let name = select('#playerName');
  socket.emit("play", {name: name.elt.value});
}

function draw(){
  if(world && world.timestamp > lastDataDrawn){
    renderWorld(world);
    lastDataDrawn = world.timestamp;
    console.log("drawn");
  }
  else {
    console.log("skipped draw");
  }
}

function renderWorld(world){

  background(0);

  for (var i = 0; i < world.asteroids.length; i++) {
    asteroidRender.render(world.asteroids[i]);
  }
  shipRender.render(world.players);
  ScoreRender.render(world.players, world.roundNumber);
  ClockRender.render(world.timeRemaining);
  asteroidExplosionRender.render(asteroidsDestroyed);
  shipExplosionRender.render(shipsDestroyed);

  asteroidsDestroyed = [];
  shipsDestroyed = [];
}

function startGame(){
  score = "";
  socket.emit("start", {});
}
