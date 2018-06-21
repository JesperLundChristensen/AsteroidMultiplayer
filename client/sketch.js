
var WIDTH = 1000;
var HEIGHT = 700;
var socket = io();
var world;
var shipRender = new ShipRender();
var asteroidRender = new AsteroidRender();
var asteroidExplosionRender = new ExplosionRender("grey");
var shipExplosionRender = new ExplosionRender("yellow");

function setup(){
  createCanvas(WIDTH, HEIGHT);
  background(0);
  frameRate(60);

  socket.on('update', function(data){
    world = data;
  });
}

function draw(){
  if(world){
    renderWorld(world);
  }
}

function renderWorld(world){
  background(0);

  for (var i = 0; i < world.asteroids.length; i++) {
    asteroidRender.render(world.asteroids[i]);
  }
  shipRender.render(world.players);
  ScoreRender.render(world.players);
  ClockRender.render(world.timeRemaining);
  asteroidExplosionRender.render(world.destroyedAsteroids);
  shipExplosionRender.render(world.deadShips);
}

function startGame(){
  score = "";
  socket.emit("start", {});
}
