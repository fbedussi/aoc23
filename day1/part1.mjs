import fs from 'fs'

const test = false

const inputTxt = fs.readFileSync(test ? './input-test.txt' : './input.txt', 'utf-8')

const lines = inputTxt.split(/\r?\n/)

const result = lines
  .map(line => {
    const digits = line.match(/[0-9]/g)
    return Number(`${digits[0]}${digits[digits.length - 1]}`)
  })
  .reduce((tot, n) => tot + n, 0)

console.log('result', result)
