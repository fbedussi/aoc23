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
  )
  .reduce((result, game, index) => {
    if (game.every(round => round.red <=12 && round.green <= 13 && round.blue <= 14)) {
      result += (index + 1)
    }
    return result
  }, 0)

console.log('result', result)
