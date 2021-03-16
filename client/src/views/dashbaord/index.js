import React, { useState, useEffect } from 'react'
import './style.css'
import { useHistory} from 'react-router-dom';

import api from '../../services/api'
import { getToken, logout } from '../../services/auth'

export default function Dashboard() { 
  const history = useHistory()
  const handleClickCreate = () => history.push('/create')
  const handleClickLogin = () => history.push('/login')
  const [avaliationList, setAvaliationList] = useState([])

  useEffect(() => {
    api.get('/avaliate')
      .then((res) => {
        setAvaliationList(res.data)
      })
  }, [])

  async function handleDelete(id) {
    await api.delete('/delete/'+id)
    window.location.reload(); 
  }

  async function handleLogout() {
    const res = await api.get('/logout', {headers: {token: getToken()}})
    logout()
    alert(res.data.success)
    handleClickLogin()
  }

  const renderCard = (card, index) => {
    return (
      <div className="box card border-secondary" key={index}>
        <div className="card-header">{card.system}</div>
          <div className="card-body col-sm">
              <h4 className="text-card-title card-title">{card.question}</h4>
              <p className="card-text">Solicitante: {card.requester}</p>
              <p className="card-text">Objetivo: {card.objective}</p>
              <p className="card-text">Data Início: {card.start_date}</p>
              <p className="card-text">Data Fim: {card.end_date}</p>
              <div className="button">
              <a href={'/edit/'+card.id} className="btn btn-secondary mr-3">Editar</a>
              <button type="button" className="btn btn-secondary" onClick={() => handleDelete(card.id)}>Excluir</button>
            </div>
        </div>
    </div>
    )
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="text-nav navbar-brand" href="#">Painel de Controle</a>
          <div className="collapse navbar-collapse" id="navbarColor02">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
                 </button>
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                      <a className="text-nav nav-link" href="" onClick={handleClickCreate}>Criar avaliação</a>
                    </li>
                    <li className="nav-item">
                    <a className="text-nav nav-link" href="" onClick={handleClickCreate}>Exibir avaliações desativadas</a>
                    </li>
                  </ul>
                  <div className="form-inline my-2 my-lg-0">
                    <button onClick={handleLogout} className="text-nav btn-secondary my-4 my-sm-1" type="submit">Logout</button>
                  </div>
            </div>
        </nav>
        <h1 className="title">Avaliçaões Ativas</h1>
        <div className="grid">
        {avaliationList.map(renderCard)}
        </div>
     </div>
  )
}