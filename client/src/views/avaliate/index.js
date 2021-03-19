import { FaStar } from 'react-icons/fa'
import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css'
import { Modal, Button } from 'antd'

import './styles.css'

import api from '../../services/api'
import { useParams } from 'react-router'

export default function Avaliate() {
  const [visible, setVisible] = useState(true);
  const [avaliationList, setAvaliationList] = useState([])
  const [rating, setRating] = useState(null)
  const [hover, setHover] = useState(null)
  const [coment, setComment] = useState("")
  const [id, setId] = useState(0)

  console.log(id)

  useEffect(() => {
    api.get('/avaliate/'+id)
      .then((res) => {
        setAvaliationList(res.data)
        console.log(res.data.Avaliation.dataValues.id)
      })
  }, [id])

  async function handleSubmit() {
    const data = {
      comments: coment,
      note: rating,
    }
    await api.post('/avaliate/'+id+'/system/1', data)
    alert("Muito obrigado por responder a avaliação!")
    setTimeout(() => {
      setVisible(false);
    }, 1000);
  }

  const closeModal = () => {
    setVisible(false)
  }

  const renderCard = (card, index) => {
    return (
    <div className={"app"}> 
    <Modal
    title={card.system}
    visible={visible}
    onCancel={closeModal}
    onOk={handleSubmit}
    closable={false}
    footer={[
      <Button>Pular</Button>,
      <Button
        type="primary"
        onClick={handleSubmit}
        >
        Enviar
        </Button>
    ]}
    >
      <div className="container" key={index}>
          <div className="card-body">
          <h5 className="card-title text-center">     
          <p className="title">{card.question}</p>
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