import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Modal, Button } from 'antd'

import api from '../services/api'

const Edit = () => {
    
    const [visible, setVisible] = useState(false)
    const [question, setQuestion] = useState("")    
    const [requester, setRequester] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [system, setSystem] = useState("")
    const [status, setStatus] = useState(0)
  

    // const { id } = useParams()

    // useEffect(() => {
    //     async function getInfo() {
    //         const res = await api.get('/edit/'+id)
    //         setQuestion(res.data.question)
    //         setRequester(res.data.requester)
    //         setStartDate(res.data.start_date)
    //         setEndDate(res.data.end_date)
    //         setSystem(res.data.system)
    //         setStatus(res.data.status)
    //     }
    //     getInfo()
    // }, [id])
  
    async function handleSubmit() {
      const data = {
             question: question,
             requester: requester,
             start_date: startDate,
             end_date: endDate,
             system: system,
             status: status,

           }
    
      await api.put('/edit' , data)
        .then(res => {
          if(res.data.status === 1) {
            alert(res.data.success)
            window.location.href='/dashboard'
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

<Modal 
        title="Editar Avaliação" 
        visible={visible}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
      >
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
                  <label>Status</label>
                  <select 
                  id="level"
                  name="level"
                  className="form-control"
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  >
                  <option>Ativa</option>
                  <option>Inativa</option>
                  </select>
                </div>
                <button onClick={handleSubmit} className="btn btn-primary btn-block">
                  Editar
                </button>
        </Modal>

          </>
      )

}

export default Edit