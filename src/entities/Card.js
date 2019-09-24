class Card {
  constructor (revealed, type, bgImage) {
    this.revealed = revealed
    this.type = type
    this.bgImage = bgImage
    this.solved = false
  }

  setRevealed (value) {
    this.revealed = value
  }

  isSameType (card) {
    return this.type === card.type
  }
}

export default Card
