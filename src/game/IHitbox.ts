import { Rectangle } from "pixi.js";

export interface IHitbox {

    getHitbox():Rectangle;
}

export function checkCollision(objA: IHitbox, objB: IHitbox):Rectangle | null {

    const rA = objA.getHitbox();
    const rB = objB.getHitbox();

    const rightmostleft = rA.left < rB.left ? rB.left : rA.left;
    const leftmostright = rA.right > rB.right ? rB.right : rA.right;
    const bottommosttop = rA.top < rB.top ? rB.top : rA.top;
    const topmostbottom = rA.bottom > rB.bottom ? rB.bottom : rA.bottom;

    // "make sense" means that left is left and right is right
    const makeSenseHorizontal = rightmostleft < leftmostright;
    const makeSenseVertical = bottommosttop < topmostbottom;
    if (makeSenseHorizontal && makeSenseVertical){

        const retval = new Rectangle();
        retval.x = rightmostleft;
        retval.y = bottommosttop;
        retval.width = leftmostright - rightmostleft;
        retval.height = topmostbottom - bottommosttop;
        return retval;
        
    } else {
        return null;
    }

}