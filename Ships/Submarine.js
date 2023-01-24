export class Submarine {
  constructor() {
    this.name = "Submarine"
    this.health = 3
    this.position
  }

  hit() {
    this.health -= 1
  }

  restoreHealth() {
    this.health = 3
  }

  place(letters, numbers) {
    const direction = Math.floor(Math.random() * 2)
    if (direction === 0) return (this.position = placeVertically(letters))
    if (direction === 1)
      return (this.position = placeHorizontally(letters, numbers))
  }
}

function placeVertically(letters) {
  const verticalLetter = Math.floor(Math.random() * 8)
  const veritcalNumber = Math.floor(Math.random() * 10) + 1
  const verticalPosition = [
    `${letters[verticalLetter]}${veritcalNumber}`,
    `${letters[verticalLetter + 1]}${veritcalNumber}`,
    `${letters[verticalLetter + 2]}${veritcalNumber}`,
  ]
  return verticalPosition
}

function placeHorizontally(letters, numbers) {
  const horizontalLetter = Math.floor(Math.random() * 8)
  const horizontalNumber = Math.floor(Math.random() * 8)
  const horizontalPosition = [
    `${letters[horizontalLetter]}${numbers[horizontalNumber]}`,
    `${letters[horizontalLetter]}${numbers[horizontalNumber + 1]}`,
    `${letters[horizontalLetter]}${numbers[horizontalNumber + 2]}`,
  ]
  return horizontalPosition
}
