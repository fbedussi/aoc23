import fs from 'fs'

const test = false

const inputTxt = fs.readFileSync(test ? './input-test.txt' : './input.txt', 'utf-8')

const lines = inputTxt.split(/\r?\n/)

const result = lines
  .map(line => line.split(': ')[1])
  .map(game => game.split('; ')
    .map(round => round.split(', ')
      .reduce((result, line) => {
        const [number, color] = line.split(' ')
        result[color] = Number(number)
        return result
      }, {red: 0, blue: 0, green: 0})
    )
    .reduce((result, round) => {
      if (round.blue > result.blue) {
        result.blue = round.blue
      }
      if (round.red > result.red) {
        result.red = round.red
      }
      if (round.green > result.green) {
        result.green = round.green
      }
      return result
    }, {red: 0, blue: 0, green: 0})
  )
  .map(game => Object.values(game).reduce((tot, x) => tot * x))
  .reduce((sum, x) => sum + x)

console.log('result', result)
