import { Container, Sprite } from "pixi.js";
import { IUpdateable } from "../utils/IUpdateable";
//import { PhysicsContainer } from "../game/PhysicsContainer";
import { HEIGHT, WIDTH } from "..";
import { Player } from "../game/Player";
import { Platform } from "../game/Platform";
import { checkCollision } from "../game/IHitbox";
//import { IHitbox } from "../game/IHitbox";
//import { Keyboard } from "../utils/Keyboard";

export class TickerScene extends Container implements IUpdateable {

    private playerKnight: Player;

    private platforms: Platform[];
    
    constructor() {
        super();

        const bg = Sprite.from("Background");
        bg.scale.set(1.3);
        bg.width = WIDTH;
        this.addChild(bg);

        this.platforms = [];

        this.playerKnight = new Player();
        this.playerKnight.scale.set(2);
        this.addChild(this.playerKnight);

        const platform_1 = new Platform();
        platform_1.x = 100;
        platform_1.y = 550;
        platform_1.scale.set(0.5)
        this.addChild(platform_1);
        this.platforms.push(platform_1);

        const platform_2 = new Platform();
        platform_2.x = 800;
        platform_2.y = 550;
        platform_2.scale.set(0.5);
        this.addChild(platform_2);
        this.platforms.push(platform_2);

    }

    public update(deltaTime: number, _deltaFrame: number): void {
        
        this.playerKnight.update(deltaTime); // update animation

        for (let platform of this.platforms) {

            const overlap = checkCollision(this.playerKnight, platform);

            if (overlap != null){

                this.playerKnight.separate(overlap, platform.position);

                
                
            }
        }
        

        // limit horizontal
        if (this.playerKnight.x > WIDTH){
            // limit right
            this.playerKnight.x = WIDTH;

        }else if(this.playerKnight.x < 0 ){
            // limit left
            this.playerKnight.x = 0;
        }

        // limit vertical
        if(this.playerKnight.y > HEIGHT){
    
            this.playerKnight.y = HEIGHT;
            this.playerKnight.speed.y = 0;
            this.playerKnight.canJump = true;
        }

    };

};