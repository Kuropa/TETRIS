import Game from "./src/game.js";
import View from "./src/view.js";
import Conrtoller from "./src/controller.js";

const root = document.querySelector('#root');

const game = new Game();
const view = new View(root, 460, 550, 20, 10);
const controller = new Conrtoller(game, view);

window.game = game;
window.view = view;
window.controller = controller;
