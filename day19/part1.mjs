import fs from 'fs'

const test = false

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

  return [label, steps, fallback]
}).reduce((result, [label, rules, fallback]) => {
  result[label] = {
    rules,
    fallback,
  }
  return result
}, {})

parts = parts.map(item => {
  return item.replace(/\{|\}/g, '').split(',').map(part => {
    const [label, value] = part.split('=')
    return [label, Number(value)]
  })
})

const acceptedParts = []
const rejectedParts = []

parts.forEach(ratings => {
  let accepted = undefined
  let workflow = workflows.in
  while (accepted === undefined) {
    const result = workflow.rules.find(([[label, operator, threshold]]) => {
      return ratings.find(([ratingLabel, ratingValue]) => {
        return ratingLabel === label && eval(`${ratingValue} ${operator} ${threshold}`)
      })
    })?.[1] || workflow.fallback 
    if (result === 'A') {
      accepted = true
    } 
    if (result === 'R') {
      accepted = false
    }
    workflow = workflows[result]
  }

  if (accepted) {
    acceptedParts.push(ratings)
  } else {
    rejectedParts.push(ratings)
  }
})


const result = acceptedParts.reduce((tot, ratings) => tot + ratings.reduce((tot, [label, value]) => tot + value, 0), 0)

console.log(result)
