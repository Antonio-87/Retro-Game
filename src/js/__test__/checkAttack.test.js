import checkAttack from "../checkAttack";

describe("checkAttack function", () => {
  test("should return true for swordsman attacking adjacent target", () => {
    expect(checkAttack("swordsman", 0, 1, 3)).toBe(true);
  });
  test("should return true for andead attacking adjacent target", () => {
    expect(checkAttack("andead", 0, 1, 3)).toBe(true);
  });
  test("should return true for bowman attacking target two spaces away", () => {
    expect(checkAttack("bowman", 0, 6, 3)).toBe(true);
  });
  test("should return true for vampire attacking target two spaces away", () => {
    expect(checkAttack("vampire", 0, 6, 3)).toBe(true);
  });
  test("should return true for magician attacking target four spaces away", () => {
    expect(checkAttack("magician", 0, 12, 3)).toBe(true);
  });
  test("should return true for daemon attacking target four spaces away", () => {
    expect(checkAttack("daemon", 0, 12, 3)).toBe(true);
  });
  test("should return false for swordsman attacking target three spaces away", () => {
    expect(checkAttack("swordsman", 0, 3, 3)).toBe(true);
  });
});
