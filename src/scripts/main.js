
// importation de la classe Game.js
import Game from './game.js';


// mise en place de l'action des clics sur les boutons + les gestionnaires du clavier pour contrôler le panier
const init = () => {
  const canvas = document.getElementById("playfield");
  const game = new Game(canvas);
  const button = document.getElementById("stopAndStartGame");
  button.addEventListener("click", () => game.startAndStop());
  button.addEventListener("click", () => game.interval());
  button.addEventListener("click", () => game.interval2());

  window.addEventListener('keydown', game.keyDownActionHandler.bind(game));
  window.addEventListener('keyup', game.keyUpActionHandler.bind(game));



}

window.addEventListener("load",init);

//
console.log('le bundle a été généré');
