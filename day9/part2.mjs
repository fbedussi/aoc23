import fs from 'fs'

const test = false

const inputTxt = fs.readFileSync(test ? './input-test.txt' : './input.txt', 'utf-8')

const lines = inputTxt.split(/\r?\n/)
  .map(line => line.trim())
  .filter(line => line)

const sequences = lines.map(line => line.split(' ').map(n => Number(n)))

const calculatePrevValue = sequence => {
  const firstValues = [sequence[0]]
  let newSequence = []
  do {
    newSequence = []
    for(let i = 1; i < sequence.length; i++) {
      newSequence.push(sequence[i] - sequence[i-1])
    }
    firstValues.push(newSequence[0])
    sequence = newSequence
  } while (newSequence.some(n => n !== 0))
  const prevValue = firstValues.reverse().slice(1).reduce((result, n) => n - result) 

  return prevValue
}

const prevValues = sequences.map(sequence => calculatePrevValue(sequence))

const result = prevValues.reduce((sum, n) => sum + n)

console.log(result)
