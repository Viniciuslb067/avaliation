import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

import api from '../../services/api'


export default function Dashboard() { 
  const history = useHistory()
  const handleClickCreate = () => history.push('/create')
  const handleClickEdit = () => history.push('/edit/')
  const [avaliationList, setAvaliationList] = useState([])

  useEffect(() => {
    api.get('/avaliate')
      .then((res) => {
        setAvaliationList(res.data)
      })
  }, [])

  async function handleDelete(id) {
    await api.delete('/delete/'+id)
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Painel de Controle</a>
          <div className="collapse navbar-collapse" id="navbarColor02">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
                 </button>
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                      <a className="nav-link" onClick={handleClickCreate}>Criar avaliação</a>
                    </li>
                  </ul>
                  <div class="form-inline my-2 my-lg-0">
                    <button class="btn btn-secondary my-4 my-sm-1" type="submit">Logout</button>
                  </div>
            </div>
        </nav>
        <h1 style={{display: "flex",justifyContent: "center", marginTop: "1rem"}}>Avaliçaões Ativas</h1>
        {avaliationList.map((val) => {
          return (
            <div class='col-md-6'>

            <div className="card border-secondary " style={{maxWidth: "20rem", marginTop: "2rem", marginLeft: "1rem"}}>
            <div className="card-header">{val.system}</div>
            <div className="card-body col-sm">
              <h4 className="card-title">{val.question}</h4>
              <p className="card-text">Solicitante: {val.requester}</p>
              <p className="card-text">Objetivo: {val.objective}</p>
              <p className="card-text">Data Início: {val.start_date}</p>
              <p className="card-text">Data Fim: {val.end_date}</p>
              <div style={{display: "flex", flexDirection: "row", justifyContent:"center"}}>
              <button type="button" class="btn btn-secondary mr-3" onClick="editr/'+val._id}">Editar</button>
              <button type="button" class="btn btn-danger" onClick={() => handleDelete(val.id)}>Excluir</button>
              </div>
          </div>
          </div>
      </div>
          )
        })}

     </div>
  )

}