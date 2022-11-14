
export default class Mobile {
    
    constructor (x, y, deltaX=0, deltaY=0, mobileImgSrc) {
        this.x = x;
        this.y = y;
        this.deltaX = deltaX;
        this.deltaY = deltaY;
        this.image = this.#createImage(mobileImgSrc);
    }

    /* crée l'objet Image à utiliser pour dessiner ce mobile */
    #createImage(imageSource) {
        const newImg = new Image();
        newImg.src = imageSource;
        return newImg;
    }

    /** gets the width of the mobile's image */
    get width() {
        return this.image.width;
    }

    /** gets the height of this mobile's image */
    get height() {
        return this.image.height;
    }

    /* draw this mobile, using the given drawing 2d context */
    draw(context) {
        context.drawImage(this.image, this.x, this.y);
    }

    /** tells if the mobile is out of the canvas or not */
    isOutOfGame(context) {
        let res = false;
        if (this.x > context.width || this.y > context.height) {
            res = true;
        }
        return res;
    }

    /** allows the detection of a collision between two mobiles */
    collisionWith(mobile) {
        let res = false;
        let x1 = Math.max(this.x, mobile.x);
        let y1 = Math.max(this.y, mobile.y);
        let x2 = Math.min(this.x + this.width, mobile.x + mobile.width);
        let y2 = Math.min(this.y + this.width, mobile.y + mobile.height);
        if (x1 <= x2 && y1 <= y2) {
            res = true;
        }
        return res;
    }

    /** move the mobile */
    move (box) {
        const boxWidth = box.width;
        const boxHeight = box.height;
        this.x = this.x + this.deltaX;
        this.y = this.y + this.deltaY;
    }
}