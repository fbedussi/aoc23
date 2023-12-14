import fs from 'fs'

const test = false

const inputTxt = fs.readFileSync(test ? './input-test.txt' : './input.txt', 'utf-8')

const lines = inputTxt.split(/\r?\n/)
  .map(line => line.trim())
  .filter(line => line)

let map = lines.map(line => line.split(''))

const tilt = () => {
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

const rotateCw = () => {
  const rotatedMap = []
  for (let colIndex = 0; colIndex < map[0].length; colIndex++) {
    let newRow = []
    for (let rowIndex = map.length -1; rowIndex >= 0; rowIndex --) {
      newRow.push(map[rowIndex][colIndex])
    }
  
    rotatedMap.push(newRow)
  }
  map = rotatedMap
}

const cycle = (n) => {
  for (let c = 1; c <= n; c++) {
    tilt()
    rotateCw()
    // print()
  }
}

const cycles = 1000

cycle(cycles * 4)

const result = map.reverse().reduce((tot, row, rowIndex) => {
  return tot + ((rowIndex + 1) * row.filter(cell => cell === 'O').length)
}, 0)

console.assert(result === 89845)

console.log(result)

