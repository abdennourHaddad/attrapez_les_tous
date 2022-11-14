// La source de l'image de la fusée
import rocket_Imgsrc from './assets/images/rocket128.png';

import Mobile from './mobile';

export default class Rocket extends Mobile {

    // width of the rocket (image)
    static ROCKET_WIDTH = 128;

    constructor(x, y, deltaX, deltaY) {
        super(x, y, deltaX, deltaY, rocket_Imgsrc);
        this.moving = null;
    } 
}
