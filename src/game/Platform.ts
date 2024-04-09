import { Container, Graphics, Rectangle, Sprite } from "pixi.js";
import { IHitbox } from "./IHitbox";
import { PhysicsContainer } from "./PhysicsContainer";

// Hereda de PhysicsContainer para que las plataformas se muevan.
export class Platform extends PhysicsContainer implements IHitbox{

    private hitbox: Graphics;

    constructor(){
        super();

        const platformContainer = new Container();
        this.addChild(platformContainer);
        platformContainer.scale.set(0.2);
        

        const sprLeft = Sprite.from("platformLeft");
        const sprCenter = Sprite.from("platformCenter");
        const sprRight = Sprite.from("platformRight");
        sprLeft.x = 0;
        sprCenter.x = 200;
        sprRight.x = 450;
        platformContainer.addChild(sprLeft);
        platformContainer.addChild(sprCenter);
        platformContainer.addChild(sprRight);
        

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFFFF00, 0.1);
        this.hitbox.drawRect(0,0,700,250);
        this.hitbox.endFill();
        platformContainer.addChild(this.hitbox);

        // Velocidad de movimiento de la plataforma. Negativa para que vaya hacia la izquierda.
        //this.speed.x = -speed;
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