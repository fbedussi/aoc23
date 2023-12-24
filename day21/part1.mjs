import fs from 'fs'

const test = false

const inputTxt = fs.readFileSync(test ? './input-test.txt' : './input.txt', 'utf-8')

const map = inputTxt.split(/\r?\n/).map(line => line.trim()).filter(Boolean)

const STEPS = test ? 6 : 64

const start = map.reduce((result, line, y) => {
  const x = line.indexOf('S')
  if (x > -1) {
    return [y, x]
  }
  return result
}, undefined)

let startingPoints = [start]

let steps = STEPS
while (steps > 0) {
  const newStartingPoints = []
  startingPoints.forEach(([y, x]) => {
    [
      [y - 1, x],
      [y + 1, x],
      [y, x - 1],
      [y, x + 1],
    ].forEach(([y, x]) => {
      if (y < 0 || x < 0 || y > map.length - 1 || x > map[0].length - 1 || map[y][x] === '#') {
        return
      }
      if (newStartingPoints.some(point => point[0] === y && point[1] === x)) {
        return
      }
      newStartingPoints.push([y, x])
    })
  })
  startingPoints = newStartingPoints
  steps--
}

startingPoints = startingPoints.map(([y,x]) => `${y}_${x}`)

map.forEach((line, y) => {
  console.log(line.split('').map((char, x) => startingPoints.includes(`${y}_${x}`) ? 'O' : char).join(''))
})
  
const result = [...new Set(startingPoints)].length

console.log(result)
