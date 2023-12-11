import fs from 'fs'

const test = false

const inputTxt = fs.readFileSync(test ? './input-test.txt' : './input.txt', 'utf-8')

const lines = inputTxt.split(/\r?\n/)
  .map(line => line.trim())
  .filter(line => line)

const map = lines.map((line, y) => line.split('').map((val, x) => [val, [y, x]]))

const RATIO = (1000000 - 1)

const expandMap = () => {
  map.forEach((line, index) => {
    if (line.every(([val]) => val === '.')) {
      for (let i = index + 1; i < map.length; i++) {
        map[i].forEach(cell => {
          cell[1][0] += RATIO
        } )
      }
    }
  })

  map[0].forEach((_, index) => {
    const col = map.map(line => line[index])
    if (col.every(([val]) => val === '.')) {
      map.forEach(line => {
        for (let i = index + 1; i < line.length; i++) {
          line[i][1][1] += RATIO
        }
      })
    }
  })
}

expandMap()

const getGalaxies = map => {
  let coordinates = []
  map.forEach((line) => {
    line.forEach(([val, coord]) => {
      if (val === '#') {
        coordinates.push(coord)
      }
    })
  })

  return coordinates
}

const coordinates = getGalaxies(map)

const distances = coordinates.reduce((result, [y1, x1], i, galaxies) => {
  return result.concat(galaxies.slice(i + 1).map(([y2, x2]) => {
    return Math.abs(y2 - y1) + Math.abs(x2 - x1)
  }))
}, [])

const result = distances.reduce((result, distance) => result + distance)

console.log(result)
