import React from "react"

import './App.css'
import { Card, Grid } from "./components";

const renderCards = () => {
  const cards = [];

  for (let index = 0; index < 18; index++) {
    cards.push(<Card />)
  }

  return cards;
}

export default () => {
  return (
    <div id="gameContainer">
      <div id="gameScreen">
        <Grid>
          {renderCards()}
        </Grid>
      </div>
    </div>
  )
}
