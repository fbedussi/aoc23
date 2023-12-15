import fs from 'fs'

const test = false

const inputTxt = fs.readFileSync(test ? './input-test.txt' : './input.txt', 'utf-8')

const steps = inputTxt.split(/\r?\n/)
  .map(line => line.trim())
  .filter(line => line)
  .flatMap(line => line.split(','))

const hash = str => {
  let result = 0
  for (let i = 0; i < str.length; i++) {
    const asciCode = str.charCodeAt(i)
    result += asciCode
    result *= 17
    const remainder = result % 256
    result = remainder
  }
  return result
}

const hashes = steps.map(hash)

const result = hashes.reduce((sum, n) => sum + n)

console.log(result)

