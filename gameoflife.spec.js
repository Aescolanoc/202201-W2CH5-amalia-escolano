import { searchCellsAliveArround } from "./gameoflife.js";

describe("testing searchCellsAliveArround", () => {
  test("If ejeX = 2, ejeY = 2, result should be 3", () => {
    expect(searchCellsAliveArround(2, 2)).toBe(3);
  });
});
