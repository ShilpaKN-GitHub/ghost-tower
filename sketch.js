var towerImage, tower;

var doorImage, doorsGroup;
var climberImage, climbersGroup;
var invisibleBlockGroup;

var ghost, ghostImage;

var gameState = "play";

function preload() {
  towerImage = loadImage("tower.png");
  
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  
  ghostImage = loadImage("ghost-standing.png");
  
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  
  spookySound.loop();
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImage);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImage);
}

function draw() {
  background(0);
  
  if (gameState === "play") {
    if(keyDown("left_arrow")) {
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")) {
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space")) {
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8;
    
    if(tower.y > 400) {
      tower.y = 300;
    }
    
    spawnExitWay();

    if(climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
    
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "end";
    }
    
    drawSprites();
  }
  
  if (gameState === "end") {
    spookySound.stop();
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over",230,250);
  }
}

function spawnExitWay() {
  if (frameCount % 240 === 0) {
    var door = createSprite(Math.round(random(120,400)), -50);
    door.addImage(doorImage);
    door.velocityY = 1;
    door.lifetime = 800;
    doorsGroup.add(door);
    
    ghost.depth = door.depth + 1;
    
    var climber = createSprite(door.x,10);
    climber.addImage(climberImage);
    climber.velocityY = 1;
    climber.lifetime = 800;
    climbersGroup.add(climber);
    
    var invisibleBlock = createSprite(door.x,15,climber.width,2);
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 800;
    invisibleBlockGroup.add(invisibleBlock);
  }
}