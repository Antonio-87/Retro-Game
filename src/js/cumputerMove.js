import checkAttack from "./checkAttack";

export default function computerMove(
  characterType,
  currentPos,
  targetPos,
  boardSize
) {
  // определяем максимальное расстояние, на которое может ходить персонаж
  let maxDistance;
  switch (characterType) {
    case "undead":
      maxDistance = 4;
      break;
    case "vampire":
      maxDistance = 2;
      break;
    case "daemon":
      maxDistance = 1;
      break;
    default:
      throw new Error("Unknown character type");
  }

  // проверяем возможность атаки
  if (checkAttack(characterType, currentPos, targetPos, boardSize) === true)
    return true;

  // преобразуем индексы в координаты (x, y)
  const currentX = currentPos % boardSize;
  const currentY = Math.floor(currentPos / boardSize);
  const targetX = targetPos % boardSize;
  const targetY = Math.floor(targetPos / boardSize);

  // ищем ближайшую клетку к игроку, на которую может попасть компьютер
  for (let distance = 1; distance <= maxDistance; distance++) {
    for (let dx = -distance; dx <= distance; dx++) {
      const dy = distance - Math.abs(dx);
      const x = currentX + dx;
      const y = currentY + dy;
      if (x < 0 || x >= boardSize || y < 0 || y >= boardSize) {
        continue;
      }
      const pos = y * boardSize + x;
      if (Math.abs(x - targetX) + Math.abs(y - targetY) <= maxDistance) {
        return pos;
      }
    }
  }

  // если не удалось найти подходящую клетку, остаемся на месте
  return currentPos;
}
