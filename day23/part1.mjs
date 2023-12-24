import fs from 'fs'

const test = false

const inputTxt = fs.readFileSync(test ? './input-test.txt' : './input.txt', 'utf-8')

const map = inputTxt.split(/\r?\n/).map(line => line.trim()).filter(Boolean)

const pathsLength = []

const endY = map.length - 1
const endX = map[0].length - 2
const maxY = endY
const maxX = map[0].length - 1

const turn = (dir, degrees) => Math.abs((dir + 360 + degrees) % 360)

const isRightDir = (cell, d) => {
  if (!['>', '<', 'v', '^'].includes(cell)) {
    return true
  }

  const rightDir = {
    '>': 90,
    'v': 180,
    '<': 270,
    '^': 0,
  }[cell]

  return d === rightDir
}

const walk = (y,x,d,l, visited) => {
  visited.push(`${y}_${x}`)
  
  if (y=== endY && x === endX) {
    pathsLength.push(l)
    return
  }

  l++

  const nextSteps = [90, 180, 270, 360].map(deg => {
    const newDir = turn(d, deg)
    const [newY, newX] = {
      0: [y-1,x, ],
      90: [y, x+1],
      180: [y+1,x],
      270: [y,x-1],
    }[newDir]

    return [newY, newX, newDir]
  })

  nextSteps.forEach(([y,x,d]) => {
    if (
        y < 0 ||
        x < 0 ||
        y > maxY ||
        x > maxX ||
        map[y][x] === '#' || 
        visited.includes(`${y}_${x}`) ||
        !isRightDir(map[y][x],d)
      ) {
      return
    }

    walk(y, x, d, l, visited.slice())
  })
}

walk(0,1,180,0, [])

const result = Math.max(...pathsLength)

console.log(result)
