import fs from 'fs'

const test = false

const inputTxt = fs.readFileSync(test ? './input-test.txt' : './input.txt', 'utf-8')

const lines = inputTxt.split(/\r?\n/)
  .map(line => line.trim())
  .filter(line => line)

const map = lines.map(line => line.split(''))

const expandMap = () => {
  let expandedMap = []
  map.forEach(line => {
    expandedMap.push(line)
    
    if (line.every(cell => cell === '.')) {
      expandedMap.push(line)
    }
  })


  let i = 0
  while (i < expandedMap[0].length) {
    const col = expandedMap.map(line => line[i])
  
    if (col.every(cell => cell === '.')) {
      expandedMap = expandedMap.map(line => line.slice(0, i).concat('.').concat(line.slice(i)))
      i++
    }

    i++
  }

  
  return expandedMap
}

const expandedMap = expandMap()

const getGalaxies = map => {
  let coordinates = []
  map.forEach((line, lineIndex) => {
    line.forEach((cell, cellIndex) => {
      if (cell === '#') {
        coordinates.push([lineIndex, cellIndex])
      }
    })
  })

  return coordinates
}

const coordinates = getGalaxies(expandedMap)

const distances = coordinates.reduce((result, [y1, x1], i, galaxies) => {
  return result.concat(galaxies.slice(i + 1).map(([y2, x2]) => {
    return Math.abs(y2 - y1) + Math.abs(x2 - x1)
  }))
}, [])

const result = distances.reduce((result, distance) => result + distance)

console.log(result)
