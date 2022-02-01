class Ball{
    constructor(x,y){
        var options ={
            isStatic:true
        }
        this.r = 30;
        this.body = Bodies.circle(x,y,this.r,options);
        this.image = loadImage("./assets/cannonball.png");
        World.add(world,this.body);

    }

    shoot(){
        var newAngle = canhao.angle - 28;
        newAngle = newAngle *(3.14/180);
        var velocidade = p5.Vector.fromAngle(newAngle);
        velocidade.mult(0.5);
        Matter.Body.setStatic(this.body,false);
        Matter.Body.setVelocity(this.body,{
            x:velocidade.x*(180/3.14),
            y:velocidade.y*(180/3.14)});
    }

    remove(index){
        Matter.Body.setVelocity(this.body,{x:0,y:0});
        setTimeout(()=>{
            Matter.World.remove(world,this.body);
            delete bolas[index];
        },1000);
    }

    display(){
        push();
        imageMode(CENTER);
        image(this.image,this.body.position.x,this.body.position.y,this.r,this.r);
       pop();
       
    }
}