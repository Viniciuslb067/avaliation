import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import api from '../../services/api'

export default function Edit() {

  const [question, setQuestion] = useState("")
  const [requester, setRequester] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [objective, setObjective] = useState("")
  const [system, setSystem] = useState("")
  const [status, setStatus] = useState(0)

  const { id } = useParams()

  useEffect(() => {
      async function getInfo() {
          const res = await api.get('/edit/'+id)
          setQuestion(res.data.question)
          setRequester(res.data.requester)
          setStartDate(res.data.start_date)
          setEndDate(res.data.end_date)
          setObjective(res.data.objective)
          setSystem(res.data.system)
          setStatus(res.data.status)
      }
      getInfo()
  }, [id])

  async function handleSubmit() {
    const data = {
           question: question,
           requester: requester,
           start_date: startDate,
           end_date: endDate,
           objective: objective,
           system: system,
           status: status,
           id:id
         }
  
    await api.put('/edit' , data)
      .then(res => {
        if(res.data.status === 1) {
          alert(res.data.success)
          window.location.href='/dashboard'
          console.log(res.data.status)
        } else {
          alert(res.data.error)
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
  
  return (
    <div className="row mt-5">
        <div className="col-md-6 m-auto">
          <div className="card card-body">
            <h1 className="text-center mb-3">
              <i className="fas fa-user-plus"></i> Editar Avaliação</h1>
              <div className="form-group">
                <label>Pergunta</label>
                <input
                  type="name"
                  id="question"
                  name="question"
                  className="form-control"
                  placeholder="Pergunta"
                  value={question}
                  onChange={e => setQuestion(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Solicitante</label>
                <input
                  id="requester"
                  name="requester"
                  className="form-control"
                  placeholder="Solicitante"
                  value={requester}
                  onChange={e => setRequester(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Objetivo</label>
                <input
                  id="objective"
                  name="objective"
                  className="form-control"
                  placeholder="Objetivo"
                  value={objective}
                  onChange={e => setObjective(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Data início</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  className="form-control"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Data fim</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  className="form-control"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Sistema</label>
                <select 
                id="system"
                name="system"
                className="form-control"
                value={system}
                onChange={e => setSystem(e.target.value)}
                >
                <option></option>
                <option>SISREF</option>
                </select>
              </div>
              <div className="form-group">
                <label>Nível</label>
                <select 
                id="level"
                name="level"
                className="form-control"
                value={status}
                onChange={e => setStatus(e.target.value)}
                >
                <option>Ativar</option>
                <option>Desativar</option>
                </select>
              </div>
              <button onClick={handleSubmit} className="btn btn-primary btn-block">
                Editar
              </button>
          </div>
        </div>
      </div>
  )

}