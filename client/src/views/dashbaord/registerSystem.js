import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import api from '../../services/api'

import Header from '../../components/Header'

export default function RegisterSystem() {
  const history = useHistory()
  const handleClickDashboard = () => history.push('/dashboard')

  const [system, setSystem] = useState("")
  const [name, setName] = useState("")
  const [area, setArea] = useState("")

  const handleSubmit = () => {
    const data = {
      system: system,
      name: name,
      area: area,
    }

    api.post('/register/system', data)
      .then(res => {
        if (res.data.status === 1) {
          alert(res.data.success)
          handleClickDashboard()
        } else {
          alert(res.data.error)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      <Header />
      <div className="row mt-5">
        <div className="col-md-6 m-auto">
          <div className="card card-body">
            <h1 className="text-center mb-3">
              Cadastrar Sistema
            </h1>
            <div className="form-group">
              <label>Nome</label>
              <input
                type="name"
                id="question"
                name="question"
                className="form-control"
                placeholder="Exemplo: Humanograma"
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>DNS</label>
              <input
                id="requester"
                name="requester"
                className="form-control"
                placeholder="Exemplo: humanograma-dev.prevnet"
                onChange={e => setSystem(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Area</label>
              <select
                id="system"
                name="system"
                className="form-control"
                onChange={e => setArea(e.target.value)}
              >
                <option></option>
                <option>DIRETORIA DE ATENDIMENTO</option>
                <option>DIRETORIA DE BENEFÍCIOS</option>
                <option>DIRETORIA DE GESTÃO DE PESSOAS</option>
                <option>DIRETORIA DE GESTÃO DE PESSOAS E ADMINISTRAÇÃO</option>
                <option>DIRETORIA DE TECNOLOGIA DA INFORMAÇÃO E INOVAÇÃO</option>
                <option>AUDITORIA-GERAL</option>
                <option>CORREGEDORIA-GERAL</option>
                <option>PRESIDÊNCIA</option>
              </select>
            </div>
            <button onClick={handleSubmit} className="btn btn-primary btn-block">
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </>
  )

}