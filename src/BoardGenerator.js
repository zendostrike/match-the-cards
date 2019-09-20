import cards from './GameResources'

const generateBoard = () => {
  let board = []

  for (let i = 0; i < cards.length * 2; i++) {
    let randomCard

    do {
      randomCard = cards[Math.floor(Math.random() * cards.length)]
    } while (
      board.filter(element => element.type === randomCard.type).length >= 2
    )

    board.push(Object.assign({}, randomCard))
  }

  return board
}

export default generateBoard
