import fs from 'fs'

const test = false

const inputTxt = fs.readFileSync(test ? './input-test.txt' : './input.txt', 'utf-8')

const lines = inputTxt.split(/\r?\n/)

let number = []
const numbersMap = []
lines.forEach((line, indexY) => {
  line.split('').concat('.').forEach((char, indexX) => {
    if (char.match(/[0-9]/)) {
      number.push(char)
    } else { 
      if (number.length) {
        numbersMap.push({n: Number(number.join('')), y: indexY, startX: indexX - number.length, endX: indexX - 1})
      }     
      number = []
    }
  })
})

const getAdjacentNumbers = (indexY, indexX) => {
  return numbersMap.filter(n => indexX >= n.startX -1 && indexX <= n.endX + 1 && indexY >= n.y - 1 && indexY <= n.y + 1).map(n => n.n)
}

const gears = []
lines.forEach((line, indexY) => {
  line.split('').forEach((char, indexX) => {
    if (char === '*') {
      const adjacentNumbers = getAdjacentNumbers(indexY, indexX)
      if (adjacentNumbers.length === 2) {
        gears.push(adjacentNumbers)
      }
    }
  })
})

const result =  gears
  .map(([n1, n2]) => n1 * n2)
  .reduce((sum, n) => sum + n, 0)

console.log(result)

