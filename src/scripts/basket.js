// La source de l'image à utiliser pour le panier (joueur)
import basketImgsrc from './assets/images/basket128.png';

import Mobile from './mobile';

export default class Basket extends Mobile {

    static BASKET_WIDTH = 128;
    static MoveState = {LEFT : 0, RIGHT : 1, NONE : 2, UP : 3, DOWN : 4};

    constructor (x, y, deltaX, deltaY) {
        super(x, y, deltaX, deltaY, basketImgsrc);
        this.moving = null;
    }

    /** moves up the basket */
    moveUp() {
        this.moving = Basket.MoveState.UP;
    }

    /** moves down the basket */
    moveDown() {
        this.moving = Basket.MoveState.DOWN;
    }

    /** moves left the basket */
    moveLeft() {
        this.moving = Basket.MoveState.LEFT;
    }

    /** moves right the basket */
    moveRight() {
        this.moving = Basket.MoveState.RIGHT;
    }

    /** stops the move of the basket */
    stopMoving() {
        this.moving = Basket.MoveState.NONE;
    }

    /** moves the baket in the context */
    move(box) {
        if (this.moving === Basket.MoveState.LEFT) {
            this.x = Math.max(0, this.x - this.deltaX);
        }
        if (this.moving === Basket.MoveState.RIGHT) {
            this.x = Math.min(box.width - Basket.BASKET_WIDTH, this.x + this.deltaX);
        }
        if (this.moving === Basket.MoveState.UP) {
            this.y = Math.max(0, this.y - this.deltaY);
        }
        if (this.moving === Basket.MoveState.DOWN) {
            this.y = Math.min(box.height - this.height, this.y + this.deltaY);
        }
    }

}