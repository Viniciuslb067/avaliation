import "bootstrap/dist/css/bootstrap.min.css" ;
import "bootswatch/dist/cosmo/bootstrap.min.css";
import { FaStar } from 'react-icons/fa'
import React, { useState, useEffect } from 'react'

import './styles.css'

import api from '../../services/api'

export default function Avaliate() {
  const [avaliationList, setAvaliationList] = useState([])
  const [rating, setRating] = useState(null)
  const [hover, setHover] = useState(null)

  useEffect(() => {
    api.get('/avaliate')
      .then((res) => {
        setAvaliationList(res.data)
      })
  }, [])

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
                onClick={handleSubmit} 
                />
          </label> 
        )
      })}
      <p>Estrelas: {rating}</p>
          </h5>
        </div>
      </div>
    </div>
    )
  }

  async function handleSubmit() {
    
    const data = {
      ip_user: "123",
      note: rating,
      comments: "Ainda tem que melhorar"
    }


    console.log(rating)
    await api.post('/avaliate/1/avaliation', data)
  }

  return (
    <div>
      {avaliationList.map(renderCard)}
    </div>
  )

}