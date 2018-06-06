
var WIDTH = 1000;
var HEIGHT = 700;
var socket = io();
var world;

function setup(){
  createCanvas(WIDTH, HEIGHT);
  background(0);
  frameRate(60);

  socket.on('update', function(data){
    world = new World(data.players, data.asteroids);
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
    AsteroidRender.render(world.asteroids[i]);
  }

  for(var key in world.players){
    if(!world.players[key].dead){
      ShipRender.render(world.players[key].ship);
    }
  }

  ScoreRender.render(world.players);
}

function startGame(){
  score = "";
  socket.emit("start", {});
}
