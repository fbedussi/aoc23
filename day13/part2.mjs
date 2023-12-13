import {assert} from 'console'
import fs from 'fs'

const test = false

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

const diff = (str1, str2) => {
  let differences = 0
  for (let i = 0; i < str1.length; i++) {
    const char1 = str1.charCodeAt(i)
    const char2 = str2.charCodeAt(i)
    if (char1 !== char2) {
      differences++
    }
  }
  return differences
}

const reflection = (map, i) => {
  let reflection = true
  let delta = 0
  let differences = 0
  while (reflection && delta < i && i + delta < map.length) {
    differences += diff(map[i - delta - 1], map[i + delta])
    reflection = (map[i - delta - 1] === map[i + delta]) || differences === 1
    delta++
  }
  return reflection && differences === 1
}

const numberOfLinesAbove = (map) => {
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

const result = colsLeft.filter(Boolean).reduce((sum, n) => sum + n, 0) + (100 * linesAbove.filter(Boolean).reduce((sum, n) => sum + n, 0))

console.log(result)

assert(result === 31947)
