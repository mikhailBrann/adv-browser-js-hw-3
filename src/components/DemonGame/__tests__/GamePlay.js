import GamePlay from "../GamePlay";
import { JSDOM } from "jsdom";
import { test, expect } from "@jest/globals";

const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
global.document = dom.window.document;
global.window = dom.window;

const parentNode = document.createElement("div");
document.body.appendChild(parentNode);
const gamePlay = new GamePlay(parentNode, 4, "test-class");

test("GamePlay constructor", () => {
  expect(gamePlay.fieldSize).toBe(4);
  expect(gamePlay.parentNode).toBe(parentNode);
  expect(gamePlay.gameFieldNode).toBeTruthy();
  expect(
    gamePlay.gameFieldNode.classList.contains("test-class__game-field"),
  ).toBeTruthy();
  expect(
    gamePlay.gameFieldNode.classList.contains("game-field-sheet"),
  ).toBeTruthy();
});

test("createCell method", () => {
  const cell = gamePlay.createCell("test-cell");
  expect(cell.tagName).toBe("SPAN");
  expect(cell.classList.contains("test-cell")).toBeTruthy();
  expect(gamePlay.cellClassName).toBe("test-cell");
});

test("renderField method", () => {
  gamePlay.renderField("test-cell");
  expect(gamePlay.cells.length).toBe(16); // 4x4 grid
  expect(gamePlay.gameFieldNode.children.length).toBe(16);
  expect(gamePlay.cells[0].classList.contains("test-cell")).toBeTruthy();
});
