import Swordsman from "../Characters/Swordsman";
import GameController from "../GameController";


test("should return correct character info string", () => {
  const character = new Swordsman(1);
  const expected = "🎖1 ⚔️40 🛡10 ❤️100";
  const result = GameController.getCharacterInfo(character);
  expect(result).toEqual(expected);
});
