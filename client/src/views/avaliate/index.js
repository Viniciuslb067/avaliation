import { FaStar } from 'react-icons/fa'
import React, { useState, useEffect } from 'react'

import './styles.css'

import api from '../../services/api'

export default function Avaliate() {
  const [avaliationList, setAvaliationList] = useState([])
  const [rating, setRating] = useState(null)
  const [hover, setHover] = useState(null)
  const [coment, setComment] = useState("")

  useEffect(() => {
    api.get('/avaliar')
      .then((res) => {
        setAvaliationList(res.data)
      })
  }, [])

  async function handleSubmit() {
    const data = {
      comments: coment,
      note: rating,
    }
    await api.post('/avaliate/1/system/1', data)
  }


  const renderCard = (card, index) => {
    return (
    <div className="container" key={index}>
    <div class="card bg-light" style={{maxWidth: "18rem"}}>
      <p className="rate">{card.system}</p>
        <div class="card-body">
        <h5 class="card-title text-center">     
        <p class="card-text">{card.question}</p>
        {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1
        return (
          <label>
            <input 
              type="radio" 
              name="rating" 
              value={ratingValue} 
              onClick={() => setRating(ratingValue)}
            />
              <FaStar 
                className="star" 
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} 
                size={40}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
                />
          </label> 
        )
      })}
      <p>Estrelas: {rating}</p>
      <input 
        type="input" 
        className="input-coment" 
        placeholder="Comentario" 
        onChange={(event) => {setComment(event.target.value)}}
      />
      <div>
      <a 
        href="" 
        className="button" 
        style={{textDecoration: "none"}}
        > Pular
      </a>
      <a 
        href="" 
        className="button" 
        style={{textDecoration: "none"}}
        onClick={handleSubmit}
        > Enviar
      </a>
      </div>
          </h5>
        </div>
      </div>
    </div>
    )
  }

  return (
    <div>
      {avaliationList.map((renderCard))}
    </div>
  )

}