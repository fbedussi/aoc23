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

const boxes = new Array(256).fill(undefined).map(() => [])

const removeLens = (box, label) => {
  boxes[box] = boxes[box].filter(([l]) => l !== label)
}

const addLens = (box, label, power) => {
  const i = boxes[box]?.findIndex(([l]) => l === label )
  if (i > -1) {
    boxes[box][i] = [label, power]
  } else {
    boxes[box].push([label, power])
  }
}

const print = (step) => {
  console.log('After "', step, '":')
  boxes.filter(box => box.length).forEach((box, index) => {
    console.log('Box', index, ':', ...box.flatMap(([label, power], index) => ['[', label, power, ']'] ))
  })
}

steps.forEach(step => {
  const [_, label, operation] = step.match(/(\w+)(.+)/)
  const box = hash(label)
  if (operation === '-') {
    removeLens(box, label)
  } else {
    const power = operation[1]
    addLens(box, label, power)
  }

  // print(step)
})


const result = boxes.reduce((sum, lenses, boxIndex) => 
  sum + lenses.reduce((sum, [label, power], lensIndex) => 
    sum + ((1 + boxIndex) * (lensIndex + 1) * power),
  0), 
0)

console.log(result)

