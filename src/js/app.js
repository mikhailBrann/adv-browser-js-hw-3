import DemonGame from "../components/DemonGame/DemonGame";
import "../components/DemonGame/css/demon-game.css";
import "../components/DemonGame/img/goblin.png";

document.addEventListener("DOMContentLoaded", () => {
  new DemonGame(document.querySelector(".kick-demon__container"), 1000);
});
