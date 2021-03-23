import React, {useState, useEffect} from 'react'
import "bootstrap/dist/css/bootstrap.min.css" ;
import { FaUser } from 'react-icons/fa'

import api from '../services/api'

const Cards = () => {

  const [avaliationList, setAvaliationList] = useState([])

  useEffect(() => {
    api.get('/avaliacao')
      .then((res) => {
        setAvaliationList(res.data)
      })
  }, [])

  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
        {avaliationList.map((value, key) => {
          return (
            <div key={key}>
              <div class="card" style={{width: '18rem'}}>
              <FaUser size={50} style={{ marginLeft: '1rem', marginTop: '1rem' }} />
                <div class="card-body">
                  <h5 class="card-title">{value.question}</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                  </div>
                  </div>
                  </div>
                )
              })}
          
        </div>
      </div>
    </div>
    </>
  )
}

export default Cards
