function knightMoves([startX, startY], [endX, endY]) {
  function getValidMoves([x, y]) {
    const possibleMoves = [
      [x + 2, y + 1],
      [x + 2, y - 1],
      [x - 2, y + 1],
      [x - 2, y - 1],
      [x + 1, y + 2],
      [x + 1, y - 2],
      [x - 1, y + 2],
      [x - 1, y - 2],
    ]
    return possibleMoves.filter(
      ([x, y]) => 0 <= x && x <= 7 && 0 <= y && y <= 7
    )
  }
  const path = []
  const queue = [[startX, startY, path]]
  const visited = []
  while (queue.length != 0) {
    const [x, y, path] = queue.shift()
    if (x == endX && y == endY) return [...path, [x, y]]
    if (!visited.includes(`${x}, ${y}`)) {
      visited.push(`${x}, ${y}`)
      const possibleMoves = getValidMoves([x, y])
      possibleMoves.map(([nextX, nextY]) =>
        queue.push([nextX, nextY, [...path, [x, y]]])
      )
    }
  }
  return null
}

const moves = knightMoves([0, 0], [7, 7])

console.log(
  `You made it in ${moves.length - 1} moves! Here's your path:`,
  moves
)
