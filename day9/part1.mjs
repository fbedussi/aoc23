import fs from 'fs'

const test = false

const inputTxt = fs.readFileSync(test ? './input-test.txt' : './input.txt', 'utf-8')

const lines = inputTxt.split(/\r?\n/)
  .map(line => line.trim())
  .filter(line => line)

const sequences = lines.map(line => line.split(' ').map(n => Number(n)))

const calculateNextValue = sequence => {
  const lastValues = [sequence[sequence.length - 1]]
  let newSequence = []
  do {
    newSequence = []
    for(let i = 1; i < sequence.length; i++) {
      newSequence.push(sequence[i] - sequence[i-1])
    }
    lastValues.push(newSequence[newSequence.length - 1])
    sequence = newSequence
  } while (newSequence.some(n => n !== 0))
  const lastValue = lastValues.reverse().reduce((result, n) => result + n) 

  return lastValue
}

const nextValues = sequences.map(sequence => calculateNextValue(sequence))

const result = nextValues.reduce((sum, n) => sum + n)

console.log(result)
