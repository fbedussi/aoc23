import fs from 'fs'

const test = false

const inputTxt = fs.readFileSync(test ? './input-test.txt' : './input.txt', 'utf-8')

const lines = inputTxt.split(/\r?\n/)

const cards = lines
  .map(line => line.split(/:\s+/)[1].split(/\s+\|\s+/).map(series => series.split(/\s+/).map(n => Number(n))).concat(1))
  
cards
  .forEach(([winning, numbers, copies], index) => {
    const wins = numbers.filter(number => winning.includes(number))

    for (let i = 1; i<= wins.length; i++) {
      cards[index+i][2]+= copies
    }
  })

const result = cards
  .reduce((cards, [_, __, copies]) =>  cards + copies, 0)

console.log(result)
