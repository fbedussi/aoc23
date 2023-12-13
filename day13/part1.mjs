import fs from 'fs'

const test = true

const inputTxt = fs.readFileSync(test ? './input-test.txt' : './input.txt', 'utf-8')

const lines = inputTxt.split(/\r?\n/)
  .map(line => line.trim())

const maps = lines.reduce((maps, line) => {
  if (!line) {
    maps.push([])
  } else {
    maps.at(-1).push(line)
  }

  return maps
}, [[]])

const flipMap = (map) => map[0].reduce((flippedMap, _, index) => {
    const flippedLine = map.map(line => line[index]).join('')
    flippedMap.push(flippedLine)
    return flippedMap
  }, [])

const flippedMaps = maps
  .map(map => map.map(line => line.split('')))
  .map(flipMap)


const reflection = (map, i) => {
  let reflection = true
  let delta = 0
  while (reflection && delta < i && i + delta < map.length) {
    reflection = (map[i - delta - 1] === map[i + delta])
    delta++
  }
  return reflection
}

const numberOfLinesAbove = map => {
  let i = 1
  while (i < map.length) {
    if (reflection(map, i)) {
      return i
    }

    i++
  }
}

const colsLeft = flippedMaps.map(numberOfLinesAbove)

const linesAbove = maps.map(numberOfLinesAbove)

const result = colsLeft.filter(Boolean).reduce((sum, n) => sum + n) + (100 * linesAbove.filter(Boolean).reduce((sum, n) => sum + n))

console.log(result)

