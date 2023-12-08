import fs from 'fs'

const test = false

const inputTxt = fs.readFileSync(test ? './input-test.txt' : './input.txt', 'utf-8')

const lines = inputTxt.split(/\r?\n/)
  .map(line => line.trim())
  .filter(line => line)

const instructions = lines[0]

const map = lines.slice(1).reduce((result, line) => {
  const [key, directions] = line.split(' = ')
  const [L, R] = directions.replaceAll(/\(|\)/g, '').split(', ')
  result[key] = {key, L, R}
  return result
}, {})

let current = map.AAA
let steps = 0
let index = 0
while (current.key !== 'ZZZ') {
  current = map[current[instructions[index]]]

  index++
  if (index === instructions.length) {
    index = 0
  }
  steps++
}

console.log(steps)
