/**
 * @todo
 * @param index - индекс поля
 * @param boardSize - размер квадратного поля (в длину или ширину)
 * @returns строка - тип ячейки на поле:
 *
 * top-left
 * top-right
 * top
 * bottom-left
 * bottom-right
 * bottom
 * right
 * left
 * center
 *
 * @example
 * ```js
 * calcTileType(0, 8); // 'top-left'
 * calcTileType(1, 8); // 'top'
 * calcTileType(63, 8); // 'bottom-right'
 * calcTileType(7, 7); // 'left'
 * ```
 * */
export function calcTileType(index, boardSize) {
  // TODO: ваш код будет тут
  const right = [];
  const left = [];
  for (let i = boardSize * 2 - 1; i < boardSize ** 2 - boardSize; i += 8)
    right.push(i);
  for (let i = boardSize; i < boardSize ** 2 - boardSize; i += 8) left.push(i);

  if (index === 0) {
    return "top-left";
  } else if (index > 0 && index < boardSize - 1) {
    return "top";
  } else if (index === boardSize - 1) {
    return "top-right";
  } else if (right.includes(index)) {
    return "right";
  } else if (left.includes(index)) {
    return "left";
  } else if (index === boardSize ** 2 - boardSize) {
    return "bottom-left";
  } else if (index > boardSize ** 2 - boardSize && index < boardSize ** 2 - 1) {
    return "bottom";
  } else if (index === boardSize ** 2 - 1) {
    return "bottom-right";
  } else {
    return "center";
  }
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return "critical";
  }

  if (health < 50) {
    return "normal";
  }

  return "high";
}
