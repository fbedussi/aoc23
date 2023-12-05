import fs from 'fs'

const test = false

const inputTxt = fs.readFileSync(test ? './input-test.txt' : './input.txt', 'utf-8')

const lines = inputTxt.split(/\r?\n/)
  .filter(line => line.trim())

const seeds = lines[0].split(': ')[1].split(/\s+/).map(n => Number(n))

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
    const found = map.find(([destination, source, length]) => result >= source && result <= (source + length))
    if (found) {
      const [destination, source, length] = found
      return destination + (result - source)
    } else {
      return result
    }
  }, seed)
})

const result = Math.min(...locations)

console.log(result)


// 3374647
