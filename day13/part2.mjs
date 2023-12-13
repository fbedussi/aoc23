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

const oldColsLeft_test = [
  5,
  undefined,
]

const oldColsLeft = [
  undefined,
  1,
  11,
  undefined,
  1,
  5,
  undefined,
  4,
  undefined,
  undefined,
  3,
  11,
  9,
  1,
  undefined,
  undefined,
  undefined,
  4,
  3,
  undefined,
  undefined,
  1,
  2,
  undefined,
  10,
  4,
  10,
  undefined,
  undefined,
  undefined,
  undefined,
  1,
  11,
  6,
  3,
  9,
  undefined,
  undefined,
  undefined,
  1,
  undefined,
  12,
  2,
  1,
  undefined,
  undefined,
  8,
  5,
  14,
  undefined,
  2,
  1,
  2,
  3,
  3,
  12,
  13,
  undefined,
  8,
  6,
  undefined,
  undefined,
  undefined,
  1,
  undefined,
  1,
  undefined,
  undefined,
  11,
  2,
  undefined,
  undefined,
  undefined,
  3,
  undefined,
  undefined,
  undefined,
  5,
  undefined,
  undefined,
  1,
  undefined,
  9,
  undefined,
  undefined,
  undefined,
  10,
  undefined,
  undefined,
  6,
  8,
  10,
  5,
  10,
  3,
  undefined,
  10,
  undefined,
  undefined,
  4,
]

const oldLinesAbove_test = [
  undefined,
  4,
]

const oldLinesAbove = [
  12,
  undefined,
  undefined,
  1,
  undefined,
  undefined,
  7,
  undefined,
  5,
  9,
  undefined,
  undefined,
  undefined,
  undefined,
  16,
  7,
  8,
  undefined,
  undefined,
  3,
  1,
  undefined,
  undefined,
  4,
  undefined,
  undefined,
  undefined,
  16,
  8,
  1,
  5,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  5,
  13,
  5,
  undefined,
  3,
  undefined,
  undefined,
  undefined,
  7,
  6,
  undefined,
  undefined,
  undefined,
  8,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  10,
  undefined,
  undefined,
  12,
  15,
  1,
  undefined,
  3,
  undefined,
  5,
  11,
  undefined,
  undefined,
  1,
  3,
  1,
  undefined,
  4,
  5,
  5,
  undefined,
  3,
  2,
  undefined,
  2,
  undefined,
  4,
  2,
  3,
  undefined,
  2,
  7,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  7,
  undefined,
  12,
  2,
  undefined,
]

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
    differences += diff(map[i - delta - 1],map[i + delta])
    reflection = (map[i - delta - 1] === map[i + delta]) || differences === 1
    delta++
  }
  return reflection
}

const numberOfLinesAbove = (map, mapIndex, oldResults) => {
  let i = 1
  while (i < map.length) {
    const oldResultIndex = oldResults[mapIndex]
    if (i !== oldResultIndex) {
      if (reflection(map, i)) {
        return i
      }
    }

    i++
  }
}

const colsLeft = flippedMaps.map((map, index) => numberOfLinesAbove(map, index, test ? oldColsLeft_test : oldColsLeft))

const linesAbove = maps.map((map, index) => numberOfLinesAbove(map, index, test ? oldLinesAbove_test : oldLinesAbove))

const result = colsLeft.filter(Boolean).reduce((sum, n) => sum + n, 0) + (100 * linesAbove.filter(Boolean).reduce((sum, n) => sum + n, 0))

console.log(result)

