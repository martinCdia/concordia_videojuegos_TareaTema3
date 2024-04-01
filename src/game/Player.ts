import { AnimatedSprite, Graphics, ObservablePoint, Rectangle, Texture } from "pixi.js";
import { PhysicsContainer } from "./PhysicsContainer";
import { Keyboard } from "../utils/Keyboard";
import { IHitbox } from "./IHitbox";

export class Player extends PhysicsContainer implements IHitbox {

    // Velocidad con la que cae el objeto player
    private static readonly GRAVITY = 15; 

    // Velocidad de movimiento horizontal del objeto player en px por frame.  
    private static readonly MOVE_SPEED = 300;

    private static readonly JUMP_SPEED = 600;

    public canJump = true;

    private knightAnimated: AnimatedSprite;

    private hitbox: Graphics;
    
    constructor(){
        super();

        this.knightAnimated = new AnimatedSprite(
            [
                /*Texture.from("knightAttak1"),
                Texture.from("knightAttak2"),
                Texture.from("knightAttak3"),
                Texture.from("knightAttak4"),
                Texture.from("knightAttak5"),
                Texture.from("knightAttak6"),
                Texture.from("knightAttak7"),
                Texture.from("knightAttak8"),
                Texture.from("knightAttak9"),
                Texture.from("knightAttak10"),
                Texture.from("knightAttak11"),*/

                Texture.from("knightRun1"),
                Texture.from("knightRun2"),
                Texture.from("knightRun3"),
                Texture.from("knightRun4"),
                Texture.from("knightRun5"),
                Texture.from("knightRun6"),
                Texture.from("knightRun7"),
                Texture.from("knightRun8"),
            ], 
            false
        );
        this.knightAnimated.play();
        this.knightAnimated.scale.set(2);
        this.knightAnimated.anchor.set(0.5,1);
        this.knightAnimated.animationSpeed = 0.30;

        /*const auxZero = new Graphics();
        auxZero.beginFill(0xffffff);
        auxZero.drawCircle(0,0,5);
        auxZero.endFill();*/

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, 0.1);
        this.hitbox.drawRect(0,0,35,40);
        this.hitbox.endFill();

        this.addChild(this.knightAnimated)
        //this.addChild(auxZero);
        this.knightAnimated.addChild(this.hitbox);
        this.hitbox.x = -13;
        this.hitbox.y = -40;

        this.acceleration.y = Player.GRAVITY;

        Keyboard.down.on("ArrowUp", this.jump, this)
    }

    public override destroy(options: any){
        super.destroy(options);
        Keyboard.down.off("ArrowUp", this.jump);
    }

    
    public override update(deltaMS: number){

        super.update(deltaMS/1000);
        this.knightAnimated.update(deltaMS/(1000/60));

        if(Keyboard.state.get("ArrowRight")){
            this.speed.x = Player.MOVE_SPEED;
            this.knightAnimated.scale.x = 2;
        }else if(Keyboard.state.get("ArrowLeft")){
            this.speed.x = -Player.MOVE_SPEED;
            this.knightAnimated.scale.x = -2;
        }else {
            this.speed.x = 0;
        }

        /*if(Keyboard.state.get("ArrowUp")){
            this.speed.y = -Player.MOVE_SPEED;
    
        }else if(Keyboard.state.get("ArrowDown")){
            this.speed.y = Player.MOVE_SPEED;
            
        }else {
            this.speed.y = 0;
        }*/

        /*if (Keyboard.state.get("ArrowUp")){
            
            this.jump();
        }*/

    }

    private jump(){
        if(this.canJump){
            this.canJump = false;
            this.speed.y = -Player.JUMP_SPEED;
        }
    }

    // Forma de conseguir rectángulo 
    public getHitbox():Rectangle{
        
        /*
            getBounds() Devuelve un rectángulo que representa el hitbox del jugador en coordenadas mundiales.
            Es decir la distancia desde arriba, desde el punto (0,0) del mundo.
        */
        return this.hitbox.getBounds();
    }


    separate(overlap: Rectangle, platform: ObservablePoint<any>) {
        
        if (overlap.width < overlap.height){

            if (this.x > platform.x){

                this.x += overlap.width; 

            } else if (this.x < platform.x) {

                this.x -= overlap.width; 
            }
           
        } else {
            if (this.y > platform.y){

                this.y -= overlap.height; 
                this.speed.y = 0;
                this.canJump = true;

            } else if (this.y < platform.y) {

                this.y += overlap.height; 
            }
        }
    }
}