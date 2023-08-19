export default function checkMove(
  characterType,
  currentPos,
  targetPos,
  boardSize
) {
  // определяем расстояние между текущей позицией и целевой
  const dx = Math.abs((targetPos % boardSize) - (currentPos % boardSize));
  const dy = Math.abs(
    Math.floor(targetPos / boardSize) - Math.floor(currentPos / boardSize)
  );

  // проверяем, что ход или атака возможны для данного типа персонажа
  if (characterType === "swordsman" || characterType === "andead") {
    if (dx <= 4 && dy <= 4) {
      return true;
    }
  } else if (characterType === "bowman" || characterType === "vampire") {
    if (dx <= 2 && dy <= 2) {
      return true;
    }
  } else if (characterType === "magician" || characterType === "daemon") {
    if (dx <= 1 && dy <= 1) {
      return true;
    }
  }

  // если ни одно условие не выполнилось, значит ход или атака невозможны
  return false;
}
