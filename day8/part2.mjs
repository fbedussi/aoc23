import fs from 'fs'
import {lcm} from 'mathjs'

const test = false

const inputTxt = fs.readFileSync(test ? './input-test.txt' : './input.txt', 'utf-8')

const lines = inputTxt.split(/\r?\n/)
  .map(line => line.trim())
  .filter(line => line)

const instructions = lines[0]

const startingPoints = []

const map = lines.slice(1).reduce((result, line) => {
  const [key, directions] = line.split(' = ')
  const [L, R] = directions.replaceAll(/\(|\)/g, '').split(', ')
  result[key] = {key, L, R}

  if (key[2] === 'A') {
    startingPoints.push(result[key])
  }

  return result
}, {})

const calculateSteps = (current) => {
  let steps = 0
  let index = 0
  while (current.key[2] !== 'Z') {
    current = map[current[instructions[index]]]

    index++
    if (index === instructions.length) {
      index = 0
    }
    steps++
  }
  return steps
}

const steps = startingPoints.map(calculateSteps)

const result = lcm(...steps)

console.log(result)

// 13830919117339
