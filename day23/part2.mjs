import fs from 'fs'

const test = false

const inputTxt = fs.readFileSync(test ? './input-test.txt' : './input.txt', 'utf-8')

const map = inputTxt.split(/\r?\n/).map(line => line.trim()).filter(Boolean)

const pathsLength = []

const endY = map.length - 1
const endX = map[0].length - 2
const maxY = endY
const maxX = map[0].length - 1

const walk = (y,x,l, visited) => {
  visited.add(`${y}_${x}`)
  // console.log(visited.size)

  
  if (y=== endY && x === endX) {
    pathsLength.push(l)
    console.log(l)
    return
  }

  l++

  const availableDirs = [
    [y-1,x],
    [y, x+1],
    [y+1,x],
    [y,x-1],
  ].filter(([y,x]) => {
    if (
        y < 0 ||
        x < 0 ||
        y > maxY ||
        x > maxX ||
        map[y][x] === '#' || 
        visited.has(`${y}_${x}`)
      ) {
      return false
    } else {
      return true
    }
  })
  
  availableDirs.forEach(([y,x]) => {  
    walk(y, x, l, new Set(visited)/* availableDirs.length > 1 ? new Set(visited) : visited */)
  })
}

walk(0,1,0, new Set([]))

const result = Math.max(...pathsLength)

console.log(result)

// 2414
// low
