export class Cruiser {
  constructor() {
    this.name = "Cruiser"
    this.health = 2
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
  const verticalLetter = Math.floor(Math.random() * 9)
  const veritcalNumber = Math.floor(Math.random() * 10) + 1
  const verticalPosition = [
    `${letters[verticalLetter]}${veritcalNumber}`,
    `${letters[verticalLetter + 1]}${veritcalNumber}`,
  ]
  return verticalPosition
}

function placeHorizontally(letters, numbers) {
  const horizontalLetter = Math.floor(Math.random() * 9)
  const horizontalNumber = Math.floor(Math.random() * 9)
  const horizontalPosition = [
    `${letters[horizontalLetter]}${numbers[horizontalNumber]}`,
    `${letters[horizontalLetter]}${numbers[horizontalNumber + 1]}`,
  ]
  return horizontalPosition
}
