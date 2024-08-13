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
  const parentNode = document
    .createElement("div")
    .classList.add("kick-demon", "kick-demon__game-field", "game-field-sheet");
  document.body.append(parentNode);

  const testObj = new DemonGame(parentNode, 420);
  const expected = {
    fieldSize: 4,
    gameSpeed: 420,
    parentNode: parentNode,
  };

  expect(testObj).toEqual(expected);
});
