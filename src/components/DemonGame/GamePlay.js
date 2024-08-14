export default class GamePlay {
  constructor(parentNode, fieldSize, parentClassName) {
    this.fieldSize = fieldSize;
    this.parentNode = parentNode;

    if (this.parentNode && this.parentNode.classList) {
      this.parentNode.insertAdjacentHTML(
        "beforeend",
        `<div class="${parentClassName + "__game-field"} game-field-sheet"></div>`,
      );

      this.gameFieldNode = this.parentNode.querySelector(".game-field-sheet");
    } else {
      console.warn("Invalid parentNode provided to constructor");
    }
  }

  createCell(className = "game-cell") {
    const cell = document.createElement("span");
    cell.classList.add(className);
    this.cellClassName = className;

    return cell;
  }

  renderField(className = "game-cell") {
    const fieldSize = this.fieldSize * this.fieldSize;

    for (let i = 0; i < fieldSize; i++) {
      this.gameFieldNode.append(this.createCell(className));
    }

    this.cells = Array.from(
      this.gameFieldNode.querySelectorAll(`.${this.cellClassName}`),
    );
  }
}
