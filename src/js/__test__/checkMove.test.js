import checkMove from "../checkMove";

describe("checkMove function", () => {
  it("should return true for swordsman moving four spaces away", () => {
    expect(checkMove("swordsman", 0, 12, 3)).toBe(true);
  });
  it("should return true for andead moving four spaces away", () => {
    expect(checkMove("andead", 0, 12, 3)).toBe(true);
  });
  it("should return true for bowman moving two spaces away", () => {
    expect(checkMove("bowman", 0, 6, 3)).toBe(true);
  });
  it("should return true for vampire moving two spaces away", () => {
    expect(checkMove("vampire", 0, 6, 3)).toBe(true);
  });
  it("should return true for magician moving one space away", () => {
    expect(checkMove("magician", 0, 1, 3)).toBe(true);
  });
  it("should return true for daemon moving one space away", () => {
    expect(checkMove("daemon", 0, 1, 3)).toBe(true);
  });
  it("should return false for swordsman moving five spaces away", () => {
    expect(checkMove("swordsman", 0, 15, 3)).toBe(false);
  });
});
