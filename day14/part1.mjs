import fs from 'fs'

const test = false

const inputTxt = fs.readFileSync(test ? './input-test.txt' : './input.txt', 'utf-8')

const lines = inputTxt.split(/\r?\n/)
  .map(line => line.trim())
  .filter(line => line)

const map = lines.map(line => line.split(''))

const tilt = map => {
  for (let rowIndex = 1; rowIndex < map.length; rowIndex++) {
    map[rowIndex].forEach((cell, cellIndex) => {
      if (cell === 'O') {
        let i = rowIndex
        while (i > 0 && map[i -1][cellIndex] === '.') {
          i--
        }
        if (map[i][cellIndex] === '.') {
          map[rowIndex][cellIndex] = '.'
          map[i][cellIndex] = 'O'
        }
      }
    })
  }
}

tilt(map)

const result = map.reverse().reduce((tot, row, rowIndex) => {
  return tot + ((rowIndex + 1) * row.filter(cell => cell === 'O').length)
}, 0)

console.log(result)

