class Card {
  constructor (frontFace, type, bgImage) {
    this.frontFace = frontFace
    this.type = type
    this.bgImage = bgImage
    this.solved = false
  }

  setFrontFace (value) {
    this.frontFace = value
  }

  isSameType (card) {
    return this.type === card.type
  }
}

export default Card
