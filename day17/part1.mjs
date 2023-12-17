import fs from 'fs'

const test = true

const inputTxt = fs.readFileSync(test ? './input-test.txt' : './input.txt', 'utf-8')

const map = inputTxt.split(/\r?\n/)
  .map(line => line.trim())
  .filter(line => line)
  .map(line => line.split('').map(n => Number(n)))

const maxY = map.length - 1
const maxX = map[0].length - 1

let heatLoss = 0

let x = 0
let y = 0

while (x < maxX && y < maxY) {
  x++
  heatLoss += map[y][x]
  y++
  heatLoss += map[y][x]
}

// console.log('min heat loss', heatLoss)

const getAlternativesByDir = (alternatives, y, x, dir, steps) => {
  if (dir === 0 && y > 0) {
      alternatives.push([y-1, x, steps, dir])
    } else if (dir === 90 && x < maxX) {
      alternatives.push([y, x+1, steps, dir])   
    } else if (dir === 180 && y < maxY) {
      alternatives.push([y+1, x, steps, dir])
    } else if (dir === 270 && x > 0) {
      alternatives.push([y, x-1, steps, dir])   
    }
}

// const print = visited => {
//   const coordinates = visited.map(str => str.split('_').map(n => Number(n)))
//   const map = new Array(maxY + 1).fill(undefined).map(() => new Array(maxX + 1).fill('.'))
//   coordinates.forEach(([y,x]) => map[y][x] = '*')
//   map.forEach(line => console.log(line.join('')))
//   console.log('')
// }

const move = (y,x,steps,dir,loss, visited) => {
  if (visited.includes(`${y}_${x}`)) {
    return
  }
  visited.push(`${y}_${x}`)

  // print(visited)
  // console.log(loss)

  if (loss >= heatLoss) {
    return
  }
  
  if (x === maxX && y === maxY) {
    heatLoss = loss
    
    console.log('min heat loss', heatLoss)

    return
  }

  const alternatives = []
  
  if (steps > 0) {
    getAlternativesByDir(alternatives, y, x, dir, steps-1)
  }
  const newDirL = Math.abs((dir + 360 - 90) % 360)
  const newDirR = Math.abs((dir + 360 + 90) % 360)
  
  getAlternativesByDir(alternatives, y, x, newDirL, 3)
  getAlternativesByDir(alternatives, y, x, newDirR, 3)

  while (alternatives.length) {
    const trial = alternatives.pop()
    move(...trial, loss + map[y][x], visited)
  }
}

move(0,0,3,90,0 - map[0][0], [])

const result = heatLoss

console.log(result)

// 1368
// high
