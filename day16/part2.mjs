import fs from 'fs'

const test = false

const inputTxt = fs.readFileSync(test ? './input-test.txt' : './input.txt', 'utf-8')


const map = inputTxt.split(/\r?\n/)
  .map(line => line.trim())
  .filter(line => line)
  .map(line => {
    return line.split('').map(char => ({char, beams: 0}))
  })

const main = ([ initialY, initialX, initialD]) => {
  console.log(initialY, initialX)
  let beams = []

  const map = inputTxt.split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line)
    .map(line => {
      return line.split('').map(char => ({char, beams: 0}))
    })

  class Beam {
    constructor(y, x, d) {
      this.x = x
      this.y = y
      this.d = d
    }

    destroy() {
      const i = beams.indexOf(this)
      beams.splice(i, 1);
    }

    moveUp() {
      if (this.y === 0) {
        this.destroy()
        return
      }
      this.y--
      map[this.y][this.x].beams++
    }

    moveRight() {
      if (this.x === map[0].length - 1) {
        this.destroy()
        return
      }
      this.x++
      map[this.y][this.x].beams++
    }

    moveDown() {
      if (this.y === map.length - 1) {
        this.destroy()
        return
      }
      this.y++
      map[this.y][this.x].beams++
    }

    moveLeft() {
      if (this.x === 0) {
        this.destroy()
        return
      }
      this.x--
      map[this.y][this.x].beams++
    }

    _move() {
      switch (this.d) {
        case 0:
          this.moveUp()
          break
        case 90:
          this.moveRight()
          break
        case 180:
          this.moveDown()
          break
        case 270:
          this.moveLeft()
          break
      }
    }

    move() {
      const tile = map[this.y][this.x].char
      switch (tile) {
        case '.': {
          this._move()
          break
        }

        case "/": {
          const mapD = {
            0: 90,
            90: 0,
            180: 270,
            270: 180,
          }
          this.d = mapD[this.d]
          this._move()
          break
        }

        case "\\": {
          const mapD = {
            0: 270,
            90: 180,
            180: 90,
            270: 0,
          }
          this.d = mapD[this.d]
          this._move()
          break
        }

        case '-': {
          switch (this.d) {
            case 0:
            case 180: {
              const newBeam = new Beam(this.y, this.x, 270)

              this.d = 90
              this._move()
              beams.push(newBeam)
              newBeam.move()
              break;
            }

            case 90:
            case 270:
              this._move()
              break
          }
          break
        }

        case '|': {
          switch (this.d) {
            case 0:
            case 180:
              this._move()
              break

            case 90:
            case 270:
              const newBeam = new Beam(this.y, this.x, 180)

              this.d = 0
              this._move()
              beams.push(newBeam)
              newBeam.move()
              break;
          }
          break
        }
      }
    }
  }

  beams.push(new Beam(initialY, initialX, initialD))
  map[initialY][initialX].beams = 1


  const calculateEnergizedTiles = () => {
    return map.flatMap(line => line.map(tile => tile.beams)).reduce((result, beams) => {
      if (beams > 0) {
        result++
      }
      return result
    }, 0)
  }

  const print = () => {
    map.forEach(line => {
      console.log(line.map(({beams}) => beams > 0 ? '#' : '.').join(''))
    })
  }

  let energizedTiles = 1
  let prevEnergizedTiles = [0,0, 0, 0, 0]

  const loop = () => {
    while (prevEnergizedTiles.some(n => n !== energizedTiles)) {
      beams.forEach(beam => {
        // console.log(beam.y, beam.x, beam.d)
        beam?.move()
      })
      energizedTiles = calculateEnergizedTiles()
      prevEnergizedTiles = prevEnergizedTiles.slice(1).concat(energizedTiles)
      // console.log(energizedTiles)
      // print()
    }
  }

  loop()

  const result = energizedTiles

  return result
}

const trials = map.flatMap((_, y) => [
  [y, 0, 90],
  [y, map[0].length - 1, 270],
]).concat(map[0].flatMap((_, x) => [
  [0, x, 180],
  [map.length - 1, x, 0],
]))

const energizedTiles = trials.map(main)

const result = Math.max(...energizedTiles)

console.log(result)
