import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
import 'antd/dist/antd.css'
import { Modal, Button } from 'antd'

import api from '../../services/api'

import './styles.css'

export default function Avaliate() {
  const [visible, setVisible] = useState(true);
  const [avaliationList, setAvaliationList] = useState([])
  const [rating, setRating] = useState(null)
  const [hover, setHover] = useState(null)
  const [coment, setComment] = useState("")

  useEffect(() => {
    api.get('/avaliate')
      .then((res) => {
        setAvaliationList(res.data)
      })
  }, [])

  async function handleSubmit(id) {
    const data = {
      comments: coment,
      note: rating,
    }

    await api.post('/avaliate/'+id, data)
      .then(res => {
        if(res.data.status === 1) {
          alert(res.data.success)
          setVisible(false)
        } else {
          console.log("CAIU NO ELSE")
          alert(res.data.error)
        }
    })
  }

  async function handleSkip(id) {
    setVisible(false)
    const data = {
      comments: coment,
      note: rating,
    }

    await api.post('/avaliate/skip/'+id, data)
  }

  const renderCard = (card, index) => {
    return (
    <div className={"app"} key={index}> 
    <Modal key={index}
      visible={visible}
      onCancel={handleSkip}
      onOk={handleSubmit}
      closable={false}
      footer={[
        <Button
          onClick={() => handleSkip(card.id)}
          >
          Pular
          </Button>,
        <Button
          type="primary"
          onClick={() => handleSubmit(card.id)}
          >
          Enviar
          </Button>
    ]}
    >
      <div className="container">
          <div className="card-body">
          <h5 className="card-title text-center">     
          <p className="">{card.question}</p>
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
                  size={50}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                  />
            </label> 
          )
        })}
        <input 
          type="input" 
          className="input-coment" 
          placeholder="Comentario" 
          onChange={(event) => {setComment(event.target.value)}}
        />
        <div>
        </div>
            </h5>
          </div>
      </div>
    </Modal>
    </div>
    )
  }

  return (
    <div>
      {avaliationList.map((renderCard))}
    </div>
  )

}