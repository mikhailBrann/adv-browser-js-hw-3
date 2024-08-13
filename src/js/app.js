import DemonGame from "./DemonGame/DemonGame";
import "./DemonGame/css/demon-game.css";
import "./DemonGame/img/goblin.png";

document.addEventListener("DOMContentLoaded", () => {
  const game = new DemonGame(
    document.querySelector(".kick-demon__container"),
    420,
  );
  game.renderField();
});
