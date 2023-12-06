import fs from 'fs'

const test = true

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

const locations = seeds.map(seed => {
  return maps.reduce((result, map) => {
    const [resultStart, resultLength] = result
    const found = map
      .filter(([destination, source, length]) => resultStart >= source && resultStart <= source + length)
      .map(([destination, source, length]) => {
        const start = Math.max(source, resultStart) - source + destination
        const length2 = Math.min(resultLength, source + length - Math.max(source, resultStart))
        return [start, length2]
      })

    if (found.length > 1) {
      throw new Error('Unexpected length', found.length)
    }

    if (found.length === 1) {
      return found[0]
    } else {
      return result
    }
  }, seed)
})

const lowest = locations.map(range => range[0])

const result = Math.min(...lowest)

console.log(result)
