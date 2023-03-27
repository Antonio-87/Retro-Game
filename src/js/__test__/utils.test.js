import { calcTileType } from "../utils";

test.each([
  { data: calcTileType(0, 8), expected: "top-left" },
  { data: calcTileType(1, 8), expected: "top" },
  { data: calcTileType(7, 8), expected: "top-right" },
  { data: calcTileType(15, 8), expected: "right" },
  { data: calcTileType(63, 8), expected: "bottom-right" },
  { data: calcTileType(56, 8), expected: "bottom-left" },
  { data: calcTileType(7, 7), expected: "left" },
])("correct operation of the function calcTileType", ({ data, expected }) => {
  expect(data).toEqual(expected);
});
