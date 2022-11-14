// La source de l'image à utiliser pour l'egg (oeuf)
import blue_eggImgsrc from './assets/images/blue-egg64.png';
import green_eggImgsrc from './assets/images/green-egg64.png';
import yelow_eggImgsrc from './assets/images/yellow-egg64.png';

import Mobile from './mobile';


export default class Egg extends Mobile {
    
    // the width of an egg
    static EGG_WIDTH = 64;

    constructor(x, y, deltaX, deltaY) {
        let mobileImgSrc;
        const choice = Math.floor((Math.random()*3));
        if (choice === 0) {
            mobileImgSrc = blue_eggImgsrc;
        }
        else if (choice === 1) {
            mobileImgSrc = green_eggImgsrc;
        }
        else {
            mobileImgSrc = yelow_eggImgsrc;
        }
        super(x, y, deltaX, deltaY, mobileImgSrc);
        this.moving = null;
    }
}
