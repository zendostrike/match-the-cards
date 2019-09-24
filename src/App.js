import React from 'react'

import './App.css'
import { Card, Grid } from './components'
import generateBoard from './BoardGenerator'

export default class App extends React.Component {
  state = {
    selectedCard: null,
    selectedIndex: null,
    cards: generateBoard()
  }

  handleSelectedCard = (card, index) => {
    const { selectedCard, selectedIndex, cards } = this.state

    if (selectedCard) {
      if (selectedIndex === index) {
        return false
      }

      const flippedCards = this.flipCards(cards, [index])

      this.setState({ cards: flippedCards })

      setTimeout(() => {
        this.matchCards(card, index)
      }, 1000)
    } else {
      console.log(cards[index])
      cards[index].revealed = true

      this.setState({
        selectedCard: card,
        selectedIndex: index,
        cards
      })
    }
  }

  matchCards = (card, i) => {
    const { selectedCard, selectedIndex, cards } = this.state

    if (!selectedCard) return false

    if (selectedCard.type === card.type) {
      console.log('match!')
      const cards = this.state.cards.map(element => {
        if (element.type === card.type) {
          element.solved = true
        }
        return element
      })

      this.setState({
        cards
      })

      this.resetTurn()
    } else {
      console.log('dont match!')
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
    console.log(cards)

    return cards
  }

  render () {
    const { cards, selectedCard } = this.state
    return (
      <div id='gameContainer'>
        <div id='gameScreen'>
          <Grid>
            {cards.map((card, index) => (
              <Card
                item={card}
                index={index}
                onClick={this.handleSelectedCard}
              />
            ))}
          </Grid>
        </div>
      </div>
    )
  }
}
