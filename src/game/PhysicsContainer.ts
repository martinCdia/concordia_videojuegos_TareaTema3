import { Container, Point } from "pixi.js";

export class PhysicsContainer extends Container{
   
    public speed: Point = new Point(); // speed of the container in pixels per second  (x and y)
    public acceleration: Point = new Point(); // acceleration added to the speed each frame (x and y). Set to zero to stop moving.

    public update(deltaSeconds: number){
        
        // X = X + V * DT + 1/2 * A * T2 (VERLET)
        this.x += this.speed.x * deltaSeconds + 1/2 * this.acceleration.x * Math.pow(deltaSeconds,2);
        this.y += this.speed.y * deltaSeconds + 1/2 * this.acceleration.y * Math.pow(deltaSeconds,2); 

        // V = V + A * DT (VERLET)
        this.speed.x += this.acceleration.x + deltaSeconds;
        this.speed.y += this.acceleration.y + deltaSeconds;
    }
}