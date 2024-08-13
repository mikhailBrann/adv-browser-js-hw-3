export default class DemonGame {
  constructor(
    parentNode,
    gameSpeed = 1500,
    fieldSize = 4,
    parentClassName = "kick-demon",
  ) {
    this.fieldSize = fieldSize;
    this.gameSpeed = gameSpeed;
    this.parentNode = parentNode;

    if (this.parentNode && this.parentNode.classList) {
      this.parentNode.classList.add(
        parentClassName + "__game-field",
        "game-field-sheet",
      );
    } else {
      console.warn("Invalid parentNode provided to DemonGame constructor");
    }
  }

  createCell(className = "game-cell") {
    const cell = document.createElement("span");
    cell.classList.add(className);
    this.cellClassName = className;
    cell.addEventListener("click", this.onCellClick.bind(this));

    return cell;
  }

  onCellClick(event) {
    if (event.target.classList.contains("demon")) {
      clearInterval(this.runDemonId);
      alert("Вы поймали демона!");
      this.runDemonId = this.runDemon();
    }
  }

  renderField(className = "game-cell") {
    const fieldSize = this.fieldSize * this.fieldSize;

    for (let i = 0; i < fieldSize; i++) {
      this.parentNode.append(this.createCell(className));
    }

    this.runDemonId = this.runDemon();
  }

  runDemon() {
    const intervalId = setInterval(() => {
      const cells = Array.from(
        this.parentNode.querySelectorAll(`.${this.cellClassName}`),
      );
      const currentDemonIndex = cells.findIndex((cell) =>
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
    }, this.gameSpeed);

    return intervalId;
  }
}
