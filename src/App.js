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
    console.log(index)
    if (selectedCard) {
      if (selectedIndex === index) {
        return false
      }

      this.matchCards(card, index)
    } else {
      console.log(cards[index])
      cards[index].frontFace = true

      this.setState({
        selectedCard: card,
        selectedIndex: index,
        cards
      })
    }
  }

  matchCards = (card, i) => {
    const { selectedCard, selectedIndex, cards } = this.state

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
    } else {
      console.log('dont match!')
      const cards = this.state.cards.map((element, index) => {
        if (index === selectedIndex || index === i) {
          element.frontFace = false
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
    console.log('turn reset')
    this.setState({
      selectedCard: null
    })
  }

  flip = cards => {
    cards.forEach(element => {})
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
