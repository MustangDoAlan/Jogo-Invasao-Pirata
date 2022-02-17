class CannonBall{
    constructor(x,y){
        var options ={
            isStatic:true
        }
        this.r = 30;
        this.body = Bodies.circle(x,y,this.r,options);
        this.image = loadImage("./assets/cannonball.png");
        World.add(world,this.body);

    }
    display(){
        ImageMode(CENTER);
        Image(this.image,this.body.position.x,this.body.position.y,this.r,this.r);
    }
}