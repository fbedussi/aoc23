import fs from 'fs'

const test = false

const inputTxt = fs.readFileSync(test ? './input-test.txt' : './input.txt', 'utf-8')

const lines = inputTxt.split(/\r?\n/)
  .map(line => line.trim())
  .filter(line => line)

const input = lines.map(line => line.split(' '))

const calculateStrength = (hand) => {
  const types = hand.split('').reduce((result, card) => {
      if (!result[card]) {
        result[card] = 1
      } else {
        result[card] += 1
      }
    return result
  }, {})

  if (types.J && types.J < 5) {
    const keyWithMaxCards = Object.entries(types).reduce((result, [key, cards]) => {
      if (key !== 'J' && (!result || cards > types[result])) {
        return key
      } else {
        return result
      }
    }, undefined)
    console.log(Object.values(types).sort().join(''), types.J)
    types[keyWithMaxCards] += types.J
    delete types.J
    console.log(Object.values(types).sort().join(''))
    console.log('\n')
  }

  const cardsPerType = Object.values(types).sort().join('')

  switch (cardsPerType) {
    case '11111':
      return 1
    case '1112':
      return 2
    case '122':
      return 3
    case '113':
      return 4
    case '23':
      return 5
    case '14':
      return 6
    case '5':
      return 7
  }

  const nOfTypes = Object.keys(types).length
  if (nOfTypes === 5) {
    return 1
  } else if (nOfTypes === 4) {
    return 2
  } else if (nOfTypes === 3) {
    return 3
  } else if (nOfTypes === 3) {
    return 3
  }
}

const compare = (hand1, hand2) => {
  const cardOrder = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J']

  let i = 0
  while (i < 5 && hand1[i] === hand2[i]) {
    i++
  }

  const index1 = cardOrder.findIndex(c => c === hand1[i])
  const index2 = cardOrder.findIndex(c => c === hand2[i])
  const difference = index2 - index1
  const result = Math.min(Math.max(-1, difference), 1)
  return result
}

const sortHands = ([hand1], [hand2]) => {
  const strength1 = calculateStrength(hand1)
  const strength2 = calculateStrength(hand2)

  if (strength1 !== strength2) {
    return  strength1 - strength2
  } else {
    return compare(hand1, hand2)
  }
}

input.sort(sortHands)

const result = input.reduce((tot, [hand, bid], index) => tot + (bid * (index + 1)), 0)

console.log(result)
