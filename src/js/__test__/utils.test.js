import { calcTileType } from "../utils";
import { characterGenerator, generateTeam } from "../generators";
import Character from "../Character";
import Bowman from "../Characters/Bowman";
import Swordsman from "../Characters/Swordsman";
import Magician from "../Characters/Magician";

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

test("error new Character(level)", () => {
  expect(() => new Character(0)).toThrow();
});

test("no error when creating character children", () => {
  expect(() => new Bowman(1)).not.toThrow();
});

test("correct attributes of level 1 characters", () => {
  const bowman = new Bowman(1);
  const attributes = [
    bowman.level,
    bowman.attack,
    bowman.defence,
    bowman.health,
    bowman.type,
  ];
  const expected = [1, 25, 25, 100, "bowman"];
  expect(attributes).toEqual(expect.arrayContaining(expected));
});

test("correct work of characterGenerator", () => {
  const allowedTypes = [Bowman, Swordsman, Magician];
  const character = characterGenerator(allowedTypes, 1);
  let result;
  for (let i = 0; i <= 10; i++) {
    result = character.next().value;
    expect(result).not.toBe(character.next().value);
  }
});

test("correct count of generateTeam", () => {
  const allowedTypes = [Bowman, Swordsman, Magician];
  const team = generateTeam(allowedTypes, 1, 10);
  expect(team.characters.length).toBe(10);
});

test("correct level of generateTeam", () => {
  const allowedTypes = [Bowman, Swordsman, Magician];
  const team = generateTeam(allowedTypes, 4, 10);
  const levels = [1, 2, 3, 4];
  for (let { level } of team.characters) {
    expect(levels).toContain(level);
  }
});
