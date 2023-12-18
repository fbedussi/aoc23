import fs from 'fs'
import geometric from 'geometric'

const test = false

const inputTxt = fs.readFileSync(test ? './input-test.txt' : './input.txt', 'utf-8')

const input = inputTxt.split(/\r?\n/)
  .map(line => line.trim())
  .filter(line => line)
  .map(line => {
    const mapDirection = {
      0: 'R', 
      1: 'D',
      2: 'L',
      3: 'U',
    }
    const [_, _length, _color] = line.split(' ')
    const length = parseInt(_color.substring(2,7), 16)
    const direction = mapDirection[_color[7]]
    return [direction, length]
  })

const coords = input.reduce((result, [direction, length]) => {
  const [x, y] = result[result.length - 1]
  const [newX, newY] = {
    R: [x + length, y],
    D: [x, y + length],
    L: [x - length,y],
    U: [x, y - length],
  }[direction]

  result.push([newX, newY])
  
  return result
}, [[0,0]])

const area = geometric.polygonArea(coords)
const perimeter = geometric.polygonLength(coords)
const result = area + (perimeter /2) +1
console.log(result)
