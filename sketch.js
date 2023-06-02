var PLAY=1;
var END=0;
var gameState=PLAY;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var nubeImg, nubesGroup;
var obs1, obs2, obs3, obs4, obs5, obs6, obstaculosGrupo;
var gameOver, gameOverImg, restart, restartImg;
var score=0;
var saltar,morir,control;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  nubeImg=loadImage("cloud.png");

  obs1=loadImage("obstacle1.png");
  obs2=loadImage("obstacle2.png");
  obs3=loadImage("obstacle3.png");
  obs4=loadImage("obstacle4.png");
  obs5=loadImage("obstacle5.png");
  obs6=loadImage("obstacle6.png");

  gameOverImg=loadImage("gameOver.png");
  restartImg=loadImage("restart.png");
  saltar=loadSound("jump.mp3");
  morir=loadSound("die.mp3");
  control=loadSound("checkpoint.mp3");

}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  trex = createSprite(50,height-40,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  //trex.scale = 0.5;
  trex.setCollider("circle",0,0,40)
  trex.debug=false;
  
  ground = createSprite(200,height-20,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,height-10,400,10);
  invisibleGround.visible = false;

 nubesGroup = new Group();
 obstaculosGrupo = new Group();
 var mensaje ="funcion SETUP";
 console.log(mensaje);

 gameOver=createSprite (width/2,height/2);
 gameOver.addImage(gameOverImg);
 
 gameOver.visible=false;

 restart=createSprite (width/2,height/2+50);
 restart.addImage(restartImg);
 restart.scale=0.5
 restart.visible=false;
 
}

function draw() {
  background(150);
  var mensaje="hola";
  console.log(mensaje);
  textSize(20);
  fill("white")
  text("Puntuación: " + score, width-150,50);

  if(gameState === PLAY){
    if(touches.length > 0 ||keyDown("space") && trex.y >= 200) {
      saltar.play();
      trex.velocityY = -10;
      touches=[];
      
          }    
    trex.velocityY = trex.velocityY + 0.8
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(score > 0 && score%500 === 0){
      control.play();
    }
    
    trex.collide(invisibleGround);
  
    nubes();
    obstaculos();
    score= score + Math.round(frameCount/60);

    if(score > 1000){
      background(0);
      text("Puntuación: " + score, width-150,50);
    }

    if(obstaculosGrupo.isTouching(trex)){
      morir.play();
      gameState=END;
    }
  }else if(gameState === END){
    background(175,41,51)
    text("Puntuación: " + score, width-150,50);
    trex.changeAnimation("collided");
    gameOver.visible=true;
    restart.visible=true;
    trex.velocityY=0;
    ground.velocityX=0;
    obstaculosGrupo.setVelocityXEach(0);
    nubesGroup.setVelocityXEach(0);
    obstaculosGrupo.setLifetimeEach(-1);
    nubesGroup.setLifetimeEach(-1);
    if(touches.length > 0){touches=[];}
    if(mousePressedOver(restart) || mousePressedOver(gameOver)){
      resert();
      
    }
  }
  
   drawSprites();
}


function nubes(){
  if(frameCount % 60 === 0){
    nube=createSprite(width,100,40,10);
    nube.velocityX=-3;
    nube.lifetime=510;
    nube.y=Math.round(random(0,height/2));
    nube.addImage(nubeImg);
    nube.scale=0.2;
    nube.depth=trex.depth;
    trex.depth=trex.depth + 1;
    nubesGroup.add(nube);
  } 
}
function obstaculos(){
  if(frameCount % 60 === 0){
    obstaculo=createSprite(width,height-40,10,40);
    obstaculo.velocityX=-6;
    var numero = Math.round(random(1,6));
    switch(numero){
      case 1: obstaculo.addImage(obs1); break;
      case 2: obstaculo.addImage(obs2); break;
      case 3: obstaculo.addImage(obs3); break;
      case 4: obstaculo.addImage(obs4); break;
      case 5: obstaculo.addImage(obs5); break;
      case 6: obstaculo.addImage(obs5); break;
      default: break;
    }
    obstaculo.scale=0.08;
    obstaculo.lifetime=400;
    obstaculosGrupo.add(obstaculo);
  }
}

 function resert(){
  gameState=PLAY;
  obstaculosGrupo.destroyEach();
  nubesGroup.destroyEach();
  gameOver.visible=false;
  restart.visible=false;
  trex.changeAnimation("running",trex_running);
  score=0  
 }

