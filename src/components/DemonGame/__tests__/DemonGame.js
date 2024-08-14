import DemonGame from "../DemonGame";
import { JSDOM } from "jsdom";
import { test, expect } from "@jest/globals";

const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
global.document = dom.window.document;
global.window = dom.window;

/**
 * @jest-environment jsdom
 */
test("DemonGame test", () => {
  const parentNode = document.createElement("div");
  parentNode.classList.add("kick-demon");
  document.body.appendChild(parentNode);

  const gameSpeed = 1000;
  const fieldSize = 5;
  const parentClassName = "custom-demon";

  const game = new DemonGame(parentNode, gameSpeed, fieldSize, parentClassName);

  expect(game.missCount).toBe(0);
  expect(game.hitCount).toBe(0);
  expect(game.toHit).toBe(false);
  expect(game.runDemonId).toBe(false);
  expect(game.gameSpeed).toBe(gameSpeed);

  expect(game.gamePlay).toBeDefined();
  expect(game.gamePlay.fieldSize).toBe(fieldSize);
  expect(game.gamePlay.parentNode).toBe(parentNode);

  const controlBtns = parentNode.querySelector(".game-field__control-btns");
  expect(controlBtns).toBeTruthy();
  expect(
    controlBtns.querySelector(".game-field__control-btn--start"),
  ).toBeTruthy();
  expect(
    controlBtns.querySelector("[data-game-field-score='miss']"),
  ).toBeTruthy();
  expect(
    controlBtns.querySelector("[data-game-field-score='hit']"),
  ).toBeTruthy();

  expect(game.gamePlay.gameFieldNode).toBeTruthy();
  expect(game.gamePlay.cells.length).toBe(fieldSize * fieldSize);

  expect(
    parentNode.querySelector(`.${parentClassName}__game-field`),
  ).toBeTruthy();
});
