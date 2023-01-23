export class BattleShip {
  constructor() {
    this.name = "Battleship"
    this.health = 4
  }

  hit() {
    this.health -= 1
  }

  place(letters, numbers) {
    const direction = Math.floor(Math.random() * 2)
    if (direction === 0) return (this.position = placeVertically(letters))
    if (direction === 1)
      return (this.position = placeHorizontally(letters, numbers))
  }
}

function placeVertically(letters) {
  const verticalLetter = Math.floor(Math.random() * 7)
  const veritcalNumber = Math.floor(Math.random() * 10) + 1
  const verticalPosition = [
    `${letters[verticalLetter]}${veritcalNumber}`,
    `${letters[verticalLetter + 1]}${veritcalNumber}`,
    `${letters[verticalLetter + 2]}${veritcalNumber}`,
    `${letters[verticalLetter + 3]}${veritcalNumber}`,
  ]
  return verticalPosition
}

function placeHorizontally(letters, numbers) {
  const horizontalLetter = Math.floor(Math.random() * 7)
  const horizontalNumber = Math.floor(Math.random() * 7)
  const horizontalPosition = [
    `${letters[horizontalLetter]}${numbers[horizontalNumber]}`,
    `${letters[horizontalLetter]}${numbers[horizontalNumber + 1]}`,
    `${letters[horizontalLetter]}${numbers[horizontalNumber + 2]}`,
    `${letters[horizontalLetter]}${numbers[horizontalNumber + 3]}`,
  ]
  return horizontalPosition
}
