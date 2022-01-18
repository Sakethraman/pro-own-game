var PLAY = 1;
var END = 0;
var gameState = PLAY;

var mainCyclist, mainCyclist_running, mainCyclist_collided;
var opponent, opponent_running, opponent_colloided;
var ground, invisibleGround, groundImage;


var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score, Wealth;
var gameOverImg, restartImg
 

function preload() {
  mainCyclist_running = loadAnimation("mainPlayer1.png",   "mainPlayer2.png");
  mainCyclist_collided = loadAnimation("mainPlayer3.png");

  

  groundImage = loadImage("Road.png");

  

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
 

  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")

  
 
}

function setup() {
  createCanvas(1200, 300);

  var message = "This is a message";
  console.log(message)

  mainCyclist = createSprite(70, 160, 20, 20);
  mainCyclist.addAnimation("running", mainCyclist_running);
  mainCyclist.addAnimation("collided",mainCyclist_collided);
  mainCyclist.scale = 0.07;
 

  ground = createSprite(200, 180, 400, 20);
 ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;

  gameOver = createSprite(500,80,10,10);
  gameOver.addImage(gameOverImg);

  restart = createSprite(500,190,10,10);
  restart.addImage(restartImg);

  gameOver.scale = 0.5;
  restart.scale = 0.5;

  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;
   
  obstaclesGroup = createGroup();
  
  mainCyclist.setCollider("rectangle", 0, 0, mainCyclist.width, mainCyclist.height);
 
  score = 0;
   

}

function draw() {

  background(180);
   
 
  textSize(20);
 
  fill(225);
  text("Distance: " + score, 950, 50);
  


  if (gameState === PLAY) {

    gameOver.visible = false;
    restart.visible = false;

    ground.velocityX = -(4 + 3 * score / 100)
    
    score = score + Math.round(getFrameRate() / 60)
    mainCyclist.y = World.mouseY;
 


    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

  

    //spawn obstacles on the ground
    spawnObstacles1();
    spawnObstacles2();


    if (obstaclesGroup.isTouching(mainCyclist)) {
 
      gameState = END;
      
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
 
    mainCyclist.changeAnimation("collided", mainCyclist_collided);
  
    ground.velocityX = 0;
    mainCyclist.velocityY = 0


    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
  

    obstaclesGroup.setVelocityXEach(0);
  

    if (mousePressedOver(restart)) {
      reset();
    }

  }


   
  mainCyclist.collide(invisibleGround);



  drawSprites();
}

function reset() {
  gameState = PLAY
  gameOver.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  
  score = 0
  mainCyclist.changeAnimation("running", mainCyclist_running);
}



function spawnObstacles1() {
  if (frameCount % 235 === 0) {
    var obstacle = createSprite(600, 235, 10, 40);
    obstacle.velocityX = -(6 + score / 100);

    //generate random obstacles
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1: obstacle.addImage(obstacle1);
        break;
      case 2: obstacle.addImage(obstacle2);
        break;
      case 3: obstacle.addImage(obstacle3);
        break;

      default: break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.07;
    obstacle.lifetime = 300;

       obstacle.depth = mainCyclist.depth;
       mainCyclist.depth = mainCyclist.depth + 1;

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnObstacles2() {
  if (frameCount % 155 === 0) {
    var obstacle = createSprite(600, 95, 10, 40);
    obstacle.velocityX = -(6 + score / 100);

    //generate random obstacles
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1: obstacle.addImage(obstacle1);
        break;
      case 2: obstacle.addImage(obstacle2);
        break;
      case 3: obstacle.addImage(obstacle3);
        break;

      default: break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.07;
    obstacle.lifetime = 300;

       obstacle.depth = mainCyclist.depth;
       mainCyclist.depth = mainCyclist.depth + 1;

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

