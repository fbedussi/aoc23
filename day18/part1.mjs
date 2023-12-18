import fs from 'fs'

const test = false

const inputTxt = fs.readFileSync(test ? './input-test.txt' : './input.txt', 'utf-8')

const input = inputTxt.split(/\r?\n/)
  .map(line => line.trim())
  .filter(line => line)
  .map(line => {
    const [direction, _length, _color] = line.split(' ')
    const length = Number(_length)
    const color = _color.substring(1,8)
    return [direction, length, color]
  })

let x = 0
let y = 0

const updateCoords = dir => {
  if (dir === 'U') {
    y--
  } else if (dir === 'R') {
    x++
  } else if (dir === 'D') {
    y++
  } else if (dir === 'L') {
    x--
  }
}

const cells = input.reduce((result, [direction, length, color]) => {
  do {
    result.push([y, x, color])
    updateCoords(direction)
    length--
  } while (length > 0)
  return result
}, [])

const ys = cells.map(([y]) => y)
const xs = cells.map(([y, x]) => x)

const minX = Math.min(...xs)
const maxX = Math.max(...xs)
const minY = Math.min(...ys)
const maxY = Math.max(...ys)

const map = new Array(maxY - minY + 1).fill(undefined).map(() => new Array(maxX - minX + 1).fill('.'))

const cellsNormalized = cells.map(([y, x, color]) => [y - minY, x - minX, color])

cellsNormalized.forEach(([y,x]) => {
  map[y][x] = '#'
})

// map.forEach(row => console.log(row.slice().join('')))

const flood = (y, x) => {
  if (y < 0 || y >= map.length || x < 0 || x >= map[0].length || map[y][x] === '#') {
    return
  }

  map[y][x] = '#'
  
  flood(y - 1, x)
  flood(y + 1, x)
  flood(y, x - 1)
  flood(y, x + 1)
}

flood(1,map[1].indexOf('#') + 1)

// map.forEach(row => console.log(row.slice().join('')))

const result = map.reduce((result, row) => {
  return result + row.filter(cell => cell === '#').length
}, 0)

console.assert(result === 76387)

console.log(result)
