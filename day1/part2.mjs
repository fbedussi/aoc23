import fs from 'fs'

const test = false

const inputTxt = fs.readFileSync(test ? './input-test2.txt' : './input.txt', 'utf-8')

const lines = inputTxt.split(/\r?\n/)

const digitMap = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '0': '0',
}

const match = (line, index) => {
  const match = line.substring(index).match(/[0-9]|one|two|three|four|five|six|seven|eight|nine/)?.[0]
  return match
}

const getFirstDigit = (line) => {
  let i = 0 
  let m =  match(line, i)
  while (i < line.length - 1 && !m) {
    i++
    m =  match(line, i)
  }
  return m
}

const getLastDigit = (line) => {
  let i = line.length - 1
  let m =  match(line, i)
  while (i > 0 && !m) {
    i--
    m =  match(line, i)
  }
  return m
}


const result = lines
  .map(line => {
    const firstDigit = getFirstDigit(line)
    const lastDigit = getLastDigit(line)

    return Number(`${digitMap[firstDigit]}${digitMap[lastDigit]}`)
  })
  .reduce((tot, n) => tot + n, 0)

console.log('result', result)

