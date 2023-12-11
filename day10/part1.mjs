import fs from 'fs'

const test = false

const inputTxt = fs.readFileSync(test ? './input-test2.txt' : './input.txt', 'utf-8')

const lines = inputTxt.split(/\r?\n/)
  .map(line => line.trim())
  .filter(line => line)

const map = lines.map(line => line.split(''))

let x = 0
let y = 0
while (map[y][x] !== 'S') {
  x++
  if (x === map[y].length - 1) {
    y++
    x = 0
  }

  if (y >= map.length) {
    throw new Error('Start not found')
  }
}
const start = [y, x]

const pipes = ['|', '-', 'L', 'J', '7', 'F', 'S']

let nearPipe

if (['|', '7', 'F'].includes(map[y-1]?.[x])) {
  nearPipe = [y-1, x]
} else if (['-', 'J', '7'].includes(map[y]?.[x+1])) {
  nearPipe = [y, x+1]
} else if (['|', 'L', 'J'].includes(map[y+1]?.[x])) {
  nearPipe = [y+1, x]
} else if (['-', 'L', 'F'].includes(map[y]?.[x-1])) {
  nearPipe = [y, x-1]
}

let nextPoint = nearPipe

const loop = [
  start,
]

const followPipe = ([y, x]) => {
  console.log(map[y][x])
  const [prevY, prevX] = loop[loop.length - 2]

  switch (map[y][x]) {
    case 'S': 
      return [y,x]
    case '|':
      return y - 1 === prevY ? [y + 1, x] : [y - 1, x]
    case '-':
      return x + 1 === prevX ? [y, x - 1] : [y, x + 1]
    case 'L':
      return y === prevY && x+1 === prevX ? [y-1, x] : [y, x+1]
    case 'J':
      return y-1 === prevY && x === prevX ? [y, x-1] : [y-1, x]
    case '7':
      return y+1 === prevY && x === prevX ? [y, x-1]: [y+1, x]
    case 'F':
      return y === prevY && x+1 === prevX ? [y+1, x] :[y, x+1]
    default:
      throw new Error('Not a pipe')
  }
}

do {
  loop.push(nextPoint)
  nextPoint = followPipe(loop[loop.length - 1])
} while (nextPoint[0] !== start[0] || nextPoint[1] !== start[1])

const result = Math.round(loop.length / 2)

console.log(result)
