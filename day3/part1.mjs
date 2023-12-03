import fs from 'fs'

const test = false

const inputTxt = fs.readFileSync(test ? './input-test.txt' : './input.txt', 'utf-8')

const lines = inputTxt.split(/\r?\n/)

const numbers = []

const isSymbol = char => {
  const result = Boolean(char && !char.match(/[0-9.]/))
  return result
}

const isNearSymbol = (number, indexX, indexY) => {
  const startX = indexX - number.length - 1
  const endX = indexX
  const positionsToCheck = [
    lines[indexY][startX],
    lines[indexY][endX],
  ]
  for (let x = startX; x <= endX; x++) {
    positionsToCheck.push(lines[indexY - 1]?.[x])
    positionsToCheck.push(lines[indexY + 1]?.[x])
  }
  
  return positionsToCheck.some(isSymbol)
}

let number = []
lines.forEach((line, indexY) => {
  line.split('').concat('.').forEach((char, indexX) => {
    if (char.match(/[0-9]/)) {
      number.push(char)
    } else {
      if (number.length && isNearSymbol(number, indexX, indexY)) {
        numbers.push(Number(number.join('')))
      }
      number = []
    }
  })
})

const result = numbers.reduce((sum, n) => sum + n)

console.log(result)

// 527626
// low


// 598856
// ko
