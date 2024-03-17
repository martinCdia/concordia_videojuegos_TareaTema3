import { AnimatedSprite, Container, Texture } from "pixi.js";
import { IUpdateable } from "../utils/IUpdateable";
//import { Keyboard } from "../utils/Keyboard";

export class TickerScene extends Container implements IUpdateable {

    private knightAnimated: AnimatedSprite;
    
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
        this.knightAnimated.animationSpeed = 0.35;
        dialog.addChild(this.knightAnimated);

    }

    public update(_deltaTime: number, deltaFrame: number): void {
        this.knightAnimated.update(deltaFrame);
        if(this.knightAnimated.x < window.innerWidth) {
            this.knightAnimated.x ++;
            //console.log(this.knightAnimated.x++);
            //console.log(window.innerWidth);
            console.log();
        }else{
            this.knightAnimated.x = 0;
        }
        
    };

};