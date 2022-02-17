class Ball{
    constructor(x,y){
        var options ={
            isStatic:true
        }
        this.r = 30;
        this.tragetory = [];
        this.afunda = false;
        this.speed = 0.05;
        this.body = Bodies.circle(x,y,this.r,options);
        this.image = loadImage("./assets/cannonball.png");
        this.animation = [this.image];
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
        this.animation = splashAnimacao;
        this.speed = 0.05;
        this.afunda = true;
        this.r = 150;
        setTimeout(()=>{
            Matter.World.remove(world,this.body);
            delete bolas[index];
        },1000);
    }

    animate(){
        this.speed = this.speed + 0.05;
    }

    display(){
        var index = floor(this.speed%this.animation.length);
        push();
        imageMode(CENTER);
        image(this.animation[index],this.body.position.x,this.body.position.y,this.r,this.r);
       pop();
       if(this.body.velocity.x > 0  && this.body.position.x > 300){
           var position = [this.body.position.x,this.body.position.y];
           this.tragetory.push(position);
       }
       for(var i = 0;i < this.tragetory.length;i = i + 1){
           image(this.image,this.tragetory[i][0],this.tragetory[i][1],5,5);
       }
       
    }

}