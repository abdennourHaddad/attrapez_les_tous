import Basket from "./basket";
import Egg from "./egg";
import Mobile from './mobile';
import Rocket from "./rocket";

export default class Game {

    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.basket = new Basket((this.canvas.width / 2) - (Basket.BASKET_WIDTH / 2), (this.canvas.height /2) - 48, 10, 10);
        this.eggs = new Array();
        this.rockets = new Array();
        this.score = 0;
        this.raf = null;
        this.timer = null;
        this.r_timer = null;
        this.lifes = 3; 
    }

    /** returns a number < n */
    alea(n) {
        return Math.ceil( (Math.random()*n));
    }

    /** adds a rocket to the context */
    addRocket() {
        const x = 0;
        const y = this.alea(this.canvas.height - (Rocket.ROCKET_WIDTH / 2));
        const deltaX = 6;
        const deltay = 0;
        const probat = Math.random();
        if (probat <= 0.5) {
            this.rockets.push(new Rocket(x, y, deltaX, deltay));
        }
    }
    
    
    /** adds an egg to the canvas */
    addEgg() {
        const x = this.alea(this.canvas.width - Egg.EGG_WIDTH);
        const y = 0;
        const deltaX = 0;
        const deltaY = 4;
        const probat = Math.random();
        if (probat <= 0.75) {
            this.eggs.push(new Egg(x, y, deltaX, deltaY));
        }
    }

    interval() {
        //check if already an interval has been set up
        if (!this.timer) {
            this.timer = setInterval(this.addEgg.bind(this), 1000);
        }
    }

    interval2() {
        // check if already an interval has been set up
        if (!this.r_timer) {
            this.r_timer = setInterval(this.addRocket.bind(this), 1000);
        }
    }

    /** stops the timer */
    stopTimer() {
        clearInterval(this.r_timer);
        r_timer = null;
        clearInterval(this.timer);
        // release our intervalID from the variable
        timer = null;
    }
    
    /** move and draw the mobiles */
    moveAndDraw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // moveAndDraw the basket
        this.basket.move(this.canvas);
        this.basket.draw(this.context);
        
        // move and draw the rockets
        this.rockets.forEach(rocket => {
            rocket.move(this.canvas); 
        });
        this.rockets.forEach(rocket => {
            if (rocket.collisionWith(this.basket)) {
                document.getElementById(`life-${this.lifes}`).style.visibility = "hidden";
                this.lifes = this.lifes - 1;
                this.score = this.score - 500;
                document.getElementById("score").textContent = this.score;
            }
            if (this.lifes === 0) {
                //this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                alert (`Vous avez perdu avec un score de ${this.score} points !`);
                location.reload();
                this.lifes = 3;
            }
        });
        this.rockets = this.rockets.filter(rocket => ! rocket.collisionWith(this.basket));
        this.rockets = this.rockets.filter(fusee => (fusee.x < this.canvas.width && fusee.x > 0));
        this.rockets.forEach(rocket => {
            rocket.draw(this.context);
        });
        
        // move and draw the eggs
        this.eggs.forEach(egg => {
            egg.move(this.canvas);
        });
        this.eggs.forEach(egg => {
            if (egg.collisionWith(this.basket)) {
                this.score = this.score + 100;
                document.getElementById("score").textContent = this.score;
            }
        });  
        this.eggs = this.eggs.filter(egg => ! egg.collisionWith(this.basket));  
        // egg collision with a rocket
        this.rockets.forEach(rocket => {
            this.eggs = this.eggs.filter(egg => ! egg.collisionWith(rocket));
        });
        // draw the eggs
        this.eggs.forEach(egg => {
            egg.draw(this.context);
        });
        this.raf = window.requestAnimationFrame(this.moveAndDraw.bind(this));
    }

    /** start and stop the animation */
    startAndStop() {
        if (this.raf === null) {
            this.moveAndDraw();
        }
        else {
            window.cancelAnimationFrame(this.raf);
            this.raf = null;
        }
    }

    keyDownActionHandler(event) {
        switch (event.key) {
            case "ArrowLeft":
            case "Left":
                this.basket.moveLeft();
                break;
            case "ArrowRight":
            case "Right":
                this.basket.moveRight();
                break;
            case "ArrowUp":
            case "Up":
                this.basket.moveUp();
                break;
            case "ArrowDown":
            case "Down":
                this.basket.moveDown();
                break;
            default: return;
        }
        event.preventDefault();
    }

    keyUpActionHandler(event) {
        switch (event.key) {
            case "ArrowLeft":
            case "Left":
            case "ArrowRight":
            case "Right":
            case "ArrowUp":
            case "ArrowDown":
            case "Up":
            case "Down":
                this.basket.stopMoving();
                break;
            default: return;
        }
        event.preventDefault();
    }
}
