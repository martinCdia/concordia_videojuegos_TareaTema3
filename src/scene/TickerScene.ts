import { AnimatedSprite, Container, Graphics, Texture } from "pixi.js";
import { IUpdateable } from "../utils/IUpdateable";
import { PhysicsContainer } from "../game/PhysicsContainer";
import { HEIGHT, WIDTH } from "..";
//import { Keyboard } from "../utils/Keyboard";

export class TickerScene extends Container implements IUpdateable {

    private knightAnimated: AnimatedSprite;

    private physKnight: PhysicsContainer
    
    constructor() {
        super();

        const dialog = new Container();
        dialog.scale.set(2);
        this.addChild(dialog);

        this.knightAnimated = new AnimatedSprite(
            [
                Texture.from("knightAttak1"),
                Texture.from("knightAttak2"),
                Texture.from("knightAttak3"),
                Texture.from("knightAttak4"),
                Texture.from("knightAttak5"),
                Texture.from("knightAttak6"),
                Texture.from("knightAttak7"),
                Texture.from("knightAttak8"),
                Texture.from("knightAttak9"),
                Texture.from("knightAttak10"),
                Texture.from("knightAttak11"),
            ], 
            false
        );
        this.knightAnimated.play();
        this.knightAnimated.anchor.set(0.5,1);
        this.knightAnimated.animationSpeed = 0.35;
        //dialog.addChild(this.knightAnimated);

        this.physKnight = new PhysicsContainer();
        this.physKnight.scale.set(2);
        this.physKnight.speed.x = 250;
        this.physKnight.speed.y = 0;
        this.physKnight.acceleration.y = 10;
        this.addChild(this.physKnight);

        const auxZero = new Graphics();
        auxZero.beginFill(0xffffff);
        auxZero.drawCircle(0,0,5);
        auxZero.endFill();

        this.physKnight.addChild(this.knightAnimated)
        this.physKnight.addChild(auxZero);

    }

    public update(deltaTime: number, deltaFrame: number): void {
        this.knightAnimated.update(deltaFrame); // update animation

        // craft delta time in seconds
        const dt = deltaTime / 1000;

        // update physics
        this.physKnight.update(dt);

        // limit horizontal
        if (this.physKnight.x > WIDTH){
            // limit right
            this.physKnight.x = WIDTH;
            this.physKnight.speed.x = Math.abs(this.physKnight.speed.x) * -1;
            this.physKnight.scale.x = -1.5;
            this.knightAnimated.tint = 0x00ff00;

        }else if(this.physKnight.x < 0 ){
            // limit left
            this.physKnight.x = 0;
            this.physKnight.speed.x = Math.abs(this.physKnight.speed.x);
            this.physKnight.scale.x = 1.5;
            this.knightAnimated.tint = 0xff0000;
        }

        // limit vertical
        if(this.physKnight.y > HEIGHT){
            this.physKnight.y = HEIGHT;
            this.physKnight.speed.y = -500 * Math.random();
            this.knightAnimated.tint = 0x0000ff;
        }

    };

};