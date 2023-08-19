export default function checkAttack(
  characterType,
  currentPos,
  targetPos,
  boardSize
) {
  const dx = Math.abs((targetPos % boardSize) - (currentPos % boardSize));
  const dy = Math.abs(
    Math.floor(targetPos / boardSize) - Math.floor(currentPos / boardSize)
  );
  if (characterType === "swordsman" || characterType === "andead") {
    if (dx <= 1 && dy <= 1) {
      return true;
    }
  } else if (characterType === "bowman" || characterType === "vampire") {
    if (dx <= 2 && dy <= 2) {
      return true;
    }
  } else if (characterType === "magician" || characterType === "daemon") {
    if (dx <= 4 && dy <= 4) {
      return true;
    }
  }
  return false;
}
