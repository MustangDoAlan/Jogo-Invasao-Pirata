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


function preload() {
 backgroundImg = loadImage("./assets/background.gif");
 torreImg = loadImage("./assets/tower.png");
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


}

function draw() {
  image(backgroundImg,0,0,1200,600);
 
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
  
   
}

function keyReleased(){
  if(keyCode===DOWN_ARROW ){
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
    if(bola.body.position.x >= width || bola.body.position.y >= height -50){
      bola.remove(i);
    }
  }

}

function mostrarNavios(){
  if(navios.length>0){
    if(navios[navios.length-1]===undefined||navios[navios.length-1].body.position.x < width-300){
      var positions = [-40,-60,-70,-20]
      var position = random(positions);
      navio1 = new Navio(width,height-100,170,170,position);
    navios.push(navio1);
    }
    for(var i = 0; i<navios.length; i = i + 1){
      if(navios[i]){
        Matter.Body.setVelocity(navios[i].body,{x:-0.9,y:0});
      }
      navios[i].display();
    }
  }
  else{
    navio1 = new Navio(width-79,height-60,170,170,-80);
    navios.push(navio1);
  }
}

function colisaoNavios(index){
for(var i  = 0;i < navios.length; i = i + 1){
  if(bolas[index]!==undefined && navios[i]!==undefined){
    var colisao = Matter.SAT.collides(bolas[index].body,navios[i].body);
    if(colisao.collided){
      navios[i].remove(i);
      Matter.World.remove(world,bolas[index].body);
      delete bolas[index];
    }
  }
}
}