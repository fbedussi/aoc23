import fs from 'fs'

const test = false

const inputTxt = fs.readFileSync(test ? './input-test.txt' : './input.txt', 'utf-8')

const lines = inputTxt.split(/\r?\n/)

const result = lines
  .map(line => line.split(/:\s+/)[1].split(/\s+\|\s+/).map(series => series.split(/\s+/).map(n => Number(n))))
  .map(([winning, numbers]) => numbers.reduce((points, number) => {
    const wins = winning.includes(number)
    if (wins) {
      if (points === 0) {
        points = 1
      } else {
        points = points * 2
      }
    }
    return points
  }, 0)
  )
  .reduce((result, points) => result + points)

console.log(result)
