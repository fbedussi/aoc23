import fs from 'fs'

const test = false

const inputTxt = fs.readFileSync(test ? './input-test.txt' : './input.txt', 'utf-8')

const lines = inputTxt.split(/\r?\n/)
  .map(line => line.trim())
  .filter(line => line)

const replaceUnknowns = (springs, unknowns, unknownsIndexes) => {
  unknownsIndexes.forEach((i, i2) => {
    springs[i] = unknowns[i2] === '0' ? '.' : '#'
  })

  // console.log(springs.join(''))

  return springs
}

const input = lines
  // .slice(1, 2)
  .map(line => {
    const [springsStr, groups] = line.split(' ')
    let unknowns = ''
    let unknownsIndexes = []

    const springs = springsStr.split('')

    springs.forEach((spring, index) => {
      if (spring === '?') {
        unknowns += '0'
        unknownsIndexes.push(index)
      }
    })

    return [{springs: replaceUnknowns(springs, unknowns, unknownsIndexes), unknowns, unknownsIndexes}, groups]
  })

function addBinary(a, b) {
  let result = '';
  let i = a.length - 1;
  let j = b.length - 1;
  let carry = 0;

  while (i >= 0 || j >= 0 || carry > 0) {
    const digitA = i >= 0 ? parseInt(a[i]) : 0;
    const digitB = j >= 0 ? parseInt(b[j]) : 0;

    const sum = digitA + digitB + carry;
    carry = sum >= 2 ? 1 : 0;

    result = (sum % 2) + result;

    i--;
    j--;
  }

  return result;
}

const thereAreUnknowns = ({unknowns}) => unknowns && unknowns.includes('0')

const addOne = ({springs, unknowns, unknownsIndexes}) => {
  unknowns = addBinary(unknowns, '1')

  return {
    springs: replaceUnknowns(springs, unknowns, unknownsIndexes),
    unknowns,
    unknownsIndexes,
  }
}

const match = ({springs}, groups) => {
  const g = springs.join('').split(/\.+/).filter(g => g.length)
  return g.map(group => group.length).join(',') === groups
}

const calculateCombinations = ([springs, groups]) => {
  let combinations = 0
  
  if (match(springs, groups)) {
      combinations++
  }
  
  while (thereAreUnknowns(springs)) {
    springs = addOne(springs)
    if (match(springs, groups)) {
      combinations++
    }
  }
  return combinations
}

const combinations = input.map(calculateCombinations)

const result = combinations.reduce((tot, n) => tot + n)

console.log(result)
