const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground,opcoes,torre,canhao;
var backgroundImg,torreImg;
var angle ;
var bola;
var bolas = [];
var navio1;
var navios = [];
var naviosAnimacao = [];
var naviosJson, imagemNavio;
var naviosFrame;
var afundaAnimacao = [];
var afundaJson, imagemAfunda, afundaFrames;
var isGameOver = false;
var splashAnimacao = [];
var splashImg,splashFrames,SplashJson;
var splashSound,bgMusic,pirataSound,explosaoSound;
var pirateVictory = false;
var score = 0;


function preload() {
 backgroundImg = loadImage("./assets/background.gif");
 torreImg = loadImage("./assets/tower.png");
 naviosJson = loadJSON("./assets/boat/boat.json");
 imagemNavio = loadImage("./assets/boat/boat.png");
 afundaJson = loadJSON("./assets/boat/brokenBoat.json");
 imagemAfunda = loadImage("./assets/boat/brokenBoat.png");
 splashJson = loadJSON("./assets/waterSplash/waterSplash.json");
 splashImg = loadImage("./assets/waterSplash/waterSplash.png");
 splashSound = loadSound("./assets/cannon_water.mp3");
 bgMusic = loadSound("./assets/background_music.mp3");
 pirataSound = loadSound("./assets/pirate_laugh.mp3");
 explosaoSound = loadSound("./assets/cannon_explosion.mp3");
}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);
  angle=15;
  
  canhao = new Cannon(180,110,130,100,angle);


 opcoes={
   isStatic: true
 } 
ground = Bodies.rectangle(0,height-1,width * 2,1,opcoes);
World.add(world,ground);


torre = Bodies.rectangle(160,350,160,310,opcoes);
 World.add(world,torre);

 naviosFrame = naviosJson.frames;
 for(var i = 0; i < naviosFrame.length;i = i + 1){
   var pos = naviosFrame[i].position;
   var img = imagemNavio.get(pos.x,pos.y,pos.w,pos.h);
   naviosAnimacao.push(img);
 }

afundaFrames = afundaJson.frames;
for(var i = 0; i < afundaFrames.length;i = i + 1){
  var pos = afundaFrames[i].position;
  var img = imagemAfunda.get(pos.x,pos.y,pos.w,pos.h);
  afundaAnimacao.push(img);
}

splashFrames = splashJson.frames;
for(var i = 0; i < splashFrames.length;i = i +1){
  var pos = splashFrames[i].position;
  var img = splashImg.get(pos.x,pos.y,pos.w,pos.h);
  splashAnimacao.push(img);
}

}

function draw() {
  image(backgroundImg,0,0,1200,600);
  if(!bgMusic.isPlaying()){
    bgMusic.play();
    bgMusic.setVolume(0.1);
    
  }
 
  Engine.update(engine);

  rect(ground.position.x,ground.position.y,width * 2,1);

  push();
  imageMode(CENTER);
  image(torreImg,torre.position.x,torre.position.y,160,310);
  pop();

  mostrarNavios();

  for(var i = 0; i < bolas.length;i = i + 1){
    mostrarBolas(bolas[i],i);
    colisaoNavios(i);
  }

  canhao.display();

  textSize(40);
  fill("#6d4c41");
  text("Pontuação:"+score,width - 200,50); 
  textAlign(CENTER,CENTER);
}

function keyReleased(){
  if(keyCode===DOWN_ARROW ){
    explosaoSound.play();
    bolas[bolas.length - 1].shoot();
  }
}

function keyPressed(){
  if(keyCode===DOWN_ARROW){
    bola = new Ball(canhao.x,canhao.y);
    bolas.push(bola);
  }
}

function mostrarBolas(bola,i){
  if(bola){
    bola.display();
    bola.animate();
    if(bola.body.position.x >= width || bola.body.position.y >= height -50){
      splashSound.play();
      splashSound.setVolume(0.1);
      bola.remove(i);
    }
  }

}

function mostrarNavios(){
  if(navios.length>0){
    if(navios[navios.length-1]===undefined||navios[navios.length-1].body.position.x < width-300){
      var positions = [-40,-60,-70,-20]
      var position = random(positions);
      navio1 = new Navio(width,height-100,170,170,position,naviosAnimacao);
    navios.push(navio1);
    }
    for(var i = 0; i<navios.length; i = i + 1){
      if(navios[i]){
        Matter.Body.setVelocity(navios[i].body,{x:-0.9,y:0});
        navios[i].display();
        navios[i].animate();
        var colisao = Matter.SAT.collides(torre,navios[i].body);
        if(colisao.collided && !navios[i].isBroken ){
          if(!pirateVictory && !pirataSound.isPlaying()){
            pirataSound.play();
            pirateVictory = true;
          }
          isGameOver = true;
          gameOver();
        }
      }
      
    }
  }
  else{
    navio1 = new Navio(width-79,height-60,170,170,-80,naviosAnimacao);
    navios.push(navio1);
  }
}

function colisaoNavios(index){
for(var i  = 0;i < navios.length; i = i + 1){
  if(bolas[index]!==undefined && navios[i]!==undefined){
    var colisao = Matter.SAT.collides(bolas[index].body,navios[i].body);
    if(colisao.collided){
      if(!navios[i].isBroken && !bolas[index].afunda){
        score = score + 5;
      }
      navios[i].remove(i);
      Matter.World.remove(world,bolas[index].body);
      delete bolas[index];
    }
  }
}
}

function gameOver(){
  swal(
    {
    title:"fim de jogo",
    text :"obrigado por jogar",
    imageUrl :"https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
    imageSize :"150x150",
    confirmButtonText: "jogar novamente"
  },
  function(isConfirm){
    if(isConfirm){
      location.reload();
    }
  }
  )
}