import React from 'react'

import { Card, Board } from './components'
import generateBoard from './BoardGenerator'
import './App.css'


export default class App extends React.Component {
  state = {
    selectedCard: null,
    selectedIndex: null,
    cards: generateBoard()
  }

  handleSelectedCard = (clickedCard, clickedIndex) => {
    const { selectedCard, selectedIndex, cards } = this.state

    if (selectedCard) {
      // Avoid click on current card
      if (selectedIndex === clickedIndex) {
        return false
      }

      // Flip second card
      const flippedCards = this.flipCards(cards, [clickedIndex])

      this.setState({ cards: flippedCards })

      // Match cards a second later to let user see the card
      setTimeout(() => {
        this.matchCards(clickedCard, clickedIndex)
      }, 1000)
    } else {
      cards[clickedIndex].revealed = true

      this.setState({
        selectedCard: clickedCard,
        selectedIndex: clickedIndex,
        cards
      })
    }
  }

  matchCards = (card, i) => {
    const { selectedCard, selectedIndex, cards } = this.state

    if (!selectedCard) return false

    if (selectedCard.type === card.type) {
      const solvedCards = cards.map(element => {
        if (element.type === card.type) {
          element.solved = true
        }
        return element
      })

      this.setState({
        cards: solvedCards
      })

      this.resetTurn()
    } else {
      const cards = this.state.cards.map((element, index) => {
        if (index === selectedIndex || index === i) {
          element.revealed = false
        }
        return element
      })

      this.setState({
        cards
      })

      this.resetTurn()
    }
  }

  resetTurn = () => {
    this.setState({
      selectedCard: null,
      selectedIndex: null
    })
  }

  flipCards = (cards, cardIndexs) => {
    for (let index = 0; index < cardIndexs.length; index++) {
      cards[cardIndexs[index]].revealed = !cards[cardIndexs[index]].revealed
    }

    return cards
  }

  render () {
    const { cards } = this.state
    return (
      <div id='gameContainer'>
        <div id='gameScreen'>
          <Board>
            {cards.map((card, index) => (
              <Card
                item={card}
                index={index}
                onClick={this.handleSelectedCard}
              />
            ))}
          </Board>
        </div>
      </div>
    )
  }
}
