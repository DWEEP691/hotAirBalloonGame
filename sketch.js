var bg, bgImg
var bottomGround;
var topGround
var balloon, balloonImg;
var ob1,ob2,ob3,ob4,ob5;
var obTop1,obBottom1;
var score = 0;
var barGroup,topObstaclesGroup,bottomObstaclesGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restartImg,gameOverImg,dieSound,jumpSound;

function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png");

ob1 = loadImage('assets/obsBottom1.png');
ob2 = loadImage('assets/obsBottom2.png');
ob3 = loadImage('assets/obsBottom3.png');
ob4 = loadImage('assets/obsTop1.png');
ob5 = loadImage('assets/obsTop2.png');

jumpSound = loadSound("assets/jump.mp3");
dieSound = loadSound("assets/die.mp3");
restartImg = loadImage("assets/restart.png");
gameOverImg = loadImage("assets/gameOver.png");

}

function setup(){
createCanvas(400,400);

//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3

//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;

barGroup = new Group();
topObstaclesGroup = new Group();
bottomObstaclesGroup = new Group();

}

function draw() {
  
  background("black");
        
  if(gameState == PLAY) {
          //making the hot air balloon jump
          if(keyDown("space")) {
            balloon.velocityY = -6 ;
            jumpSound.play();
          }

          //adding gravity
           balloon.velocityY = balloon.velocityY + 2;

        spawnTopObstacles();
        spawnBottomObstacles();
        Bar();
  }
   
        drawSprites();
        Score();
}

function spawnTopObstacles() {
  if(World.frameCount%60 === 0) {
    obTop1 = createSprite(300,50,50,100);
    obTop1.velocityX = -7;
    obTop1.scale = 0.1;
    obTop1.y = Math.round(random(20,150));

    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obTop1.addImage(ob4);
      break;
      case 2: obTop1.addImage(ob5);
      break;
      default:break;
    }

    obTop1.lifetime = 250;
    balloon.depth += 1;

    topObstaclesGroup.add(obTop1);
  }
}

function spawnBottomObstacles() {
  if(World.frameCount%60===0) {
    obBottom1 = createSprite(400,350,50,100);
    obBottom1.velocityX = -5;
    obBottom1.scale = 0.1;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obBottom1.addImage(ob1);
      break;
      case 2: obBottom1.addImage(ob2);
      break;
      case 3: obBottom1.addImage(ob3);
      break;
      default:break;
    }

    obBottom1.lifetime = 200;
    obBottom1.depth += 1;
    
    bottomObstaclesGroup.add(obBottom1);
  }
}

function Bar() {
  if(World.frameCount%60===0) {
    var bar = createSprite(400,200,10,80);
    bar.velocityX = -5;
    bar.depth = balloon.depth;
    bar.lifetime = 200;
    bar.visible = false;

    barGroup.add(bar);
  }
}

function Score() {
  if(balloon.isTouching(barGroup)) {
    score += 1;
  }
  textFont("algerian");
  textSize(20);
  strokeWeight(2);
  fill('aqua');
  text("Score: " + score,300,100);
}