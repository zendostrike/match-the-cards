import React from 'react'
import './styles.css'

const Card = ({ item, index, onClick }) => {
  return (
    <div className='scene scene--card'>
      <div
        className={`card ${item.frontFace ? 'is-flipped' : ''}`}
        onClick={() => {
          if (!item.solved) {
            onClick(item, index)
          }
        }}
      >
        <div className='card__face card__face--front' />
        <div
          className='card__face card__face--back'
          style={{
            background: `url(${item.bgImage})`,
            backgroundSize: 'cover'
          }}
        />
      </div>
    </div>
  )
}

export default Card
