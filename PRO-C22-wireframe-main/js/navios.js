class Navio{
        constructor(x,y,w,h,navioPos){
            this.body = Bodies.rectangle(x,y,w,h);
            this.w = w;
            this.h = h;
            this.image = loadImage("./assets/boat.png");
            this.navioP = navioPos;
            World.add(world,this.body);
        }

        remove(index){
            setTimeout(()=>{
                Matter.World.remove(world,navios[index].body);
                delete navios[index];
            },2000);
            

        }

        display(){
            push();
            translate(this.body.position.x,this.body.position.y);
            rotate(this.body.angle);
            imageMode(CENTER);
            image(this.image,0,this.navioP,this.w,this.h);
            pop();

        }

        
}