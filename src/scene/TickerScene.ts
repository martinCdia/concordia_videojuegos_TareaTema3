import { Container, Texture, TilingSprite } from "pixi.js";
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

    private world: Container;

    private bg: TilingSprite;

    private gameSpeed: number = 100;

    private timePassed: number = 0;
    
    constructor() {
        super();

        this.world = new Container();

        // Agregamos un fondo a la escena
        this.bg = new TilingSprite(Texture.from("Background"), WIDTH, HEIGHT);
        this.addChild(this.bg);

        // Arreglo de objetos platform 
        this.platforms = [];

        // Objeto de tipo Platform() con el fin de crear una plataforma.
        const platform_1 = new Platform(100);
        //platform_1.x = 565;
        //platform_1.y = 550;
        platform_1.position.set(565,550);
        this.world.addChild(platform_1);
        this.platforms.push(platform_1);
        
        const platform_2 = new Platform(100);
        //platform_2.x = platform_1.x + 300;
        //platform_2.y = 450;
        platform_2.position.set(865,450);
        this.world.addChild(platform_2);
        this.platforms.push(platform_2); 

        const platform_3 = new Platform(100);
        //platform_3.x = platform_2.x + 300;
        //platform_3.y = 550;
        platform_3.position.set(1165,550)
        this.world.addChild(platform_3);
        this.platforms.push(platform_3)

        // Objeto de tipo Player() que hereda de Sprite y tiene los métodos propios del jugador
        this.playerKnight = new Player();
        this.playerKnight.scale.set(2);
        this.world.addChild(this.playerKnight);


        this.addChild(this.world);

    }

    /* Método para actualizar cada frame, se llama en cada cuadro o frame por segundo.
       Heredado de la interface IUpdateable
    */
    public update(deltaTime: number, _deltaFrame: number): void {
        
        this.timePassed += deltaTime;

        if (this.timePassed > (2000 * 200 / this.gameSpeed)){
            this.gameSpeed += 10;
            this.timePassed = 0;
            const plat = new Platform(100);
            //platform_1.x = 565;
            //platform_1.y = 550;
            plat.position.set(WIDTH,Math.random() * 1080);
            this.world.addChild(plat);
            this.platforms.push(plat);
        }

        /* Actualización del objeto playerKnight para animación y movimiento */
        this.playerKnight.update(deltaTime); 

        /* Controla la colisión para que no se caiga de las plataformas */
        for (let platform of this.platforms) {

            // Animación de los objetos platform en milisegundos
            platform.speed.x = -this.gameSpeed;
            platform.update(deltaTime / 1000);

            //  Si el jugador choca contra la plataforma devuelve un rectángulo, sino null
            const overlap = checkCollision(this.playerKnight, platform);
            if (overlap != null){
                this.playerKnight.separate(overlap, platform.position);
            }

            if (platform.getHitbox().right < 0){

                platform.destroy();
            }

        }

        this.platforms = this.platforms.filter((elem) => !elem.destroyed);

        /* LÓGICA PARA NO SALIRSE DE PANTALLA */
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
            this.playerKnight.speed.y = 0; // El objeto queda clavado en el piso. Si quisiera que rebote es un numero negativo
            this.playerKnight.canJump = true; // Cuando apoye en el suelo pueda volver a saltar
        }
 

        //this.world.x = -this.playerKnight.x * this.worldTransform.a + WIDTH / 10;
        //this.bg.tilePosition.x = this.world.x * 0.5;
        this.bg.tilePosition.x -= this.gameSpeed * deltaTime / 1000;

    };

};