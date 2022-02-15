var score =0;
var dude,monster, laser, backround;

var dudeImg,monsterImg, laserImg, blastImg, backgroundImg;

var monsterGroup, laserGroup;


var life =3;
var score=0;
var gameState=1

function preload(){
  dudeImg = loadImage("dude.png")
 blastImg = loadImage("blast.png")
  laserImg = loadImage("laser.png")
  monsterImg = loadImage("monster.png")
  backroundImg = loadImage("space.jpg")
}
function setup() {
  createCanvas(800, 600);

  backround= createSprite(50, width/2, 100,height);
  backround.addImage(backroundImg)
  
  dude= createSprite(100, height/2, 50,50);
  dude.addImage(dudeImg)
  dude.scale=0.2
  
  laserGroup = createGroup();   
  monsterGroup = createGroup();   
  
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
}

function draw() {
 background("#BDA297");
  
  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)

  if(gameState===1){
    dude.y=mouseY  

    if (frameCount % 80 === 0) {
      drawMonster();
    }

    

    if(keyDown("space")){
      shootLaser();
    }

    
    if (monsterGroup.collide(dude)) {
      handleGameover(monsterGroup);
    }
    
    if(monsterGroup.collide(laserGroup)){
      handleMonsterCollision(monsterGroup);
    }

    

    drawSprites();
  }
    
  
}

function drawMonster(){
  monster = createSprite(800,random(20,780),40,40);
  monster.addImage(monsterImg);
  monster.scale = 0.1;
  monster.velocityX = -8;
  monster.lifetime = 400;
  monsterGroup.add(monster);
}


function shootLaser(){
  laser= createSprite(150, width/2, 50,20)
  laser.y= dude.y-20
  laser.addImage(laserImg)
  laser.scale=0.12
  laser.velocityX= 7
  laserGroup.add(laser)
}

function handleMonsterCollision(monsterGroup){
    if (life > 0) {
       score=score+1;
    }

   blast= createSprite(laser.x+60, laser.y, 50,50);
  blast.addImage(blastImg)
   blast.scale=0.3
 blast.life=20
    laserGroup.destroyEach()
    laserGroup.destroyEach()
}

function handleGameover(monsterGroup){
  
    life=life-1;
    monsterGroup.destroyEach();
    

    if (life === 0) {
      gameState=2
      
     
    }
  
}
