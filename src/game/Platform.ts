import { Container, Graphics, Rectangle, Sprite } from "pixi.js";
import { IHitbox } from "./IHitbox";

export class Platform extends Container implements IHitbox{

    private hitbox: Graphics;

    constructor(){
        super();

        const sprLeft = Sprite.from("platformLeft");
        const sprCenter = Sprite.from("platformCenter");
        const sprRight = Sprite.from("platformRight");
        const platformContainer = new Container();

        sprLeft.x = 0;
        sprCenter.x = 120;
        sprRight.x = 245;

        platformContainer.addChild(sprLeft);
        platformContainer.addChild(sprCenter);
        platformContainer.addChild(sprRight);
        this.addChild(platformContainer);

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFFFF00, 0.3);
        this.hitbox.drawRect(0,0,375,100);
        this.hitbox.endFill();

        platformContainer.addChild(this.hitbox);
    }

    // Forma de conseguir rectángulo 
    public getHitbox(): Rectangle {
        
        /*
            getBounds() Devuelve un rectángulo que representa el hitbox del jugador en coordenadas mundiales.
            Es decir la distancia desde arriba, desde el punto (0,0) del mundo.
        */
            return this.hitbox.getBounds();
    }

}