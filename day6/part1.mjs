const test = false

const inputTest = [
  [7,9],
  [15,40],
  [30,200],
]

const inputTrue = [
  [53,313],
  [89,1090],
  [76,1214],
  [98,1201]
]

const input = test ? inputTest : inputTrue


const minMax = input.map(([t,d]) => {
  let min
  let max
  for (let t1 = 0; t1 <= t; t1++) {
    const d1 = t1 * (t - t1)
    if (min === undefined && d1 > d) {
      min = t1
    }
    if (min !== undefined && d1 <= d) {
      max = t1
      break
    }
  }
  return [min, max]
})

const delta = minMax.map(([min, max]) => max - min)

const result = delta.reduce((tot, n) => tot * n)

console.log(result)
