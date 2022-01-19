const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground,opcoes,torre,canhao;
var backgroundImg,torreImg;
var angle ;
var bola;


function preload() {
 backgroundImg = loadImage("./assets/background.gif");
 torreImg = loadImage("./assets/tower.png");
}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
  canhao = new Cannon(180,110,130,100,angle);
  bola = new CannonBall(180,110);

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

  canhao.display();
  bola.display();
   
}
