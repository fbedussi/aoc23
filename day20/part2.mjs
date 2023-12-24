import fs from 'fs'

const test = true

const inputTxt = fs.readFileSync(test ? './input-test.txt' : './input.txt', 'utf-8')

const lines = inputTxt.split(/\r?\n/)

let [workflows, parts] = lines.reduce(([workflows, parts, flag], line) => {
  if (!line.trim().length) {
    flag = true
    return [workflows, parts, flag]
  }
  if (!flag) {
    workflows.push(line)
  } else {
    parts.push(line)
  }
  return [workflows, parts, flag]
}, [[], [], false])

workflows = workflows.map(workflow => {
  let [label, allSteps] = workflow.replace('}', '').split('{')

  allSteps = allSteps.split(',')

  let fallback = allSteps[allSteps.length - 1]
  let steps = allSteps.slice(0, allSteps.length - 1)

  steps = steps.map(step => {
    let [condition, result] = step.split(':')

    const label = condition.substring(0,1)
    const operator = condition.substring(1,2)
    const threshold = Number(condition.substring(2))

    return [[label, operator, threshold], result]
  })

  steps.push([undefined, fallback])

  return [label, steps]
}).reduce((result, [label, rules]) => {
  result[label] = {
    label,
    rules,
  }
  return result
}, {})

workflows.A = {
  label: 'A'
}
workflows.R = {
  label: 'R'
}

const paths = []

const explore = (node, steps) => {
  if (node.label === 'R') {
    return
  }

  if (node.label === 'A') {
    paths.push(steps)
    return
  }
  
  node.rules.forEach(([condition, label], i) => {
    const newSteps = steps.slice()
    const prevRules = node.rules.slice(0, i)
    prevRules.forEach(([[label, operator, threshold]]) => {
      newSteps.push([label, operator === '<' ? '>' : '<', operator === '>' ? threshold + 1 : threshold - 1])
    })
    newSteps.push(condition)
    explore(workflows[label], newSteps)
  })
}

explore(workflows.in, [])

const thresholds = paths.map(path => path
  .filter(Boolean)
  .reduce((result, [rating, condition, threshold]) => {
  if (condition === '>') {
    result[rating].min = Math.max( result[rating].min, threshold + 1)
  } else {
    result[rating].max = Math.min(result[rating].max, threshold - 1)
  }
  return result
}, {
  x: {
    min: 1,
    max: 4000,
  },
  m: {
    min: 1,
    max: 4000,
  },
  a: {
    min: 1,
    max: 4000,
  },
  s: {
    min: 1,
    max: 4000,
  },
}))

const results = thresholds.map(values => {
  const a = Object.values(values)
  const delta = a.map(({max, min}) => max - min)
  return delta.reduce((tot, d) => tot * d)
})

const result = results.reduce((sum, x) => sum + x)

console.assert(result === 167409079868000)

console.log(result, result - 167409079868000)

// 133707925993308
// low
