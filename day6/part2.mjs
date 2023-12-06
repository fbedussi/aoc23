const test = false

const inputTest = [
  [71530,940200],
]

const inputTrue = [
  [53897698,313109012141201],
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
