import fs from 'fs'

const test = false

const inputTxt = fs.readFileSync(test ? './input-test.txt' : './input.txt', 'utf-8')

const lines = inputTxt.split(/\r?\n/)
  .filter(line => line.trim())

const seeds = lines[0].split(': ')[1].split(/\s+/).map(n => Number(n)).reduce((result, n) => {
  if (result[result.length - 1]?.length === 1) {
    result[result.length - 1].push(n)
  } else {
    result.push([n])
  }
  return result
}, [])

const maps = lines.slice(1).reduce((result, line) => {
  if (!line[0].match(/[0-9]/)) {
    result.push([])
  } else {
    result[result.length - 1].push(line.split(/\s+/).map(n => Number(n)))
  }
  return result
}, [])


let inputs = seeds
let step = 0
while (step < maps.length) {
  const map = maps[step]
  let output = []
  inputs.forEach(([inputStart, inputLength]) => {
    const founds = map
      .filter(([destination, source, length]) => inputStart <= source + length && (inputStart + inputLength) >= source)

    if (founds.length === 0) {
      output.push([inputStart, inputLength])
    } else {
      founds.forEach(found => {
        const [destination, source, length] = found

        const preLength = source - inputStart
        if (preLength > 0) {
          output.push([inputStart, preLength])
          inputStart = source
          inputLength -= preLength
        }

        const postLength = (inputStart + inputLength) - (source + length)
        if (postLength > 0) {
          output.push([source + length, postLength])
          inputLength -= postLength
        }

        if (inputLength > 0) {
          output.push([destination + (inputStart - source), inputLength])
        }
      })
    }
  })

  inputs = output
  step++
}

const starts = inputs.map(range => range[0])

const result = Math.min(...starts)

console.log(result)

// 7623322
// hight
