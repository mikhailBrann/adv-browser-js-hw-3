import GamePlay from "./GamePlay";

export default class DemonGame {
  constructor(
    parentNode,
    gameSpeed = 1500,
    fieldSize = 4,
    parentClassName = "kick-demon",
  ) {
    this.missCount = 0;
    this.hitCount = 0;
    this.toHit = false;
    this.runDemonId = false;
    this.gameSpeed = gameSpeed;
    this.gamePlay = new GamePlay(parentNode, fieldSize, parentClassName);

    //#TODO: генерим кнопки для меню игры, так как они могут быть кастомными
    this.gamePlay.parentNode.insertAdjacentHTML(
      "afterbegin",
      `<div class="game-field__control-btns">
          <button class="game-field__control-btn game-field__control-btn--start">Новая игра</button>
          <label >Промазал: <output data-game-field-score="miss">0</output></label>
          <label >Попал: <output data-game-field-score="hit">0</output></label>
      </div>`,
    );

    this.gamePlay.renderField(this.cellClassName);
    //#TODO: add event listener
    this.gamePlay.gameFieldNode.addEventListener(
      "click",
      this.onCellClick.bind(this),
    );
    this.gamePlay.parentNode
      .querySelector(".game-field__control-btn--start")
      .addEventListener("click", this.runGame.bind(this));
  }

  onCellClick(event) {
    if (event.target.classList.contains("demon")) {
      this._countUpdate(
        this.gamePlay.parentNode.querySelector("[data-game-field-score='hit']"),
        ++this.hitCount,
      );
      this.toHit = true;
    }
  }

  runGame() {
    if (this.runDemonId) {
      clearInterval(this.runDemonId);
      this._resetGame();
      this.runDemonId = this._runDemon();
      return;
    }

    this.runDemonId = this._runDemon();
  }

  _runDemon() {
    const intervalId = setInterval(() => {
      const cells = this.gamePlay.cells;

      if (this.missCount >= 5) {
        this._resetGame();
        cells.forEach((cell) => cell.classList.remove("demon"));
        alert("Вы проиграли!");
        return;
      }

      if (!this.toHit) {
        this._countUpdate(
          this.gamePlay.parentNode.querySelector(
            "[data-game-field-score='miss']",
          ),
          ++this.missCount,
        );
      }

      const currentDemonIndex = this.gamePlay.cells.findIndex((cell) =>
        cell.classList.contains("demon"),
      );

      const randomIndex = (exclude) => {
        let num = Math.floor(Math.random() * cells.length);

        if (exclude === num && cells.length === exclude + 1) {
          return num--;
        }

        if (exclude === num && exclude == 0) {
          return num++;
        }

        return num;
      };

      cells.forEach((cell) => cell.classList.remove("demon"));
      cells[randomIndex(currentDemonIndex)].classList.add("demon");
      this.toHit = false;
    }, this.gameSpeed);

    return intervalId;
  }

  _resetGame() {
    clearInterval(this.runDemonId);
    this.missCount = 0;
    this.hitCount = 0;
    this.toHit = false;
    this.runDemonId = false;
  }

  _countUpdate(node, value) {
    node.textContent = value;
  }
}
