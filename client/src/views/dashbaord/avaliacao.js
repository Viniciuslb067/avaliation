import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { FaTimes, FaChartLine, FaEdit } from 'react-icons/fa'
import { Modal, Button } from 'antd'

import api from '../../services/api'

import Header from '../../components/Header'
import Edit from '../../components/Edit'

export default function Avaliacao() {
  const [avaliationList, setAvaliationList] = useState([])

  useEffect(() => {
    api.get('/avaliacao/ativa')
      .then((res) => {
        setAvaliationList(res.data)
      })
  }, [])

  async function handleDelete(id) {
    await api.delete('/delete/'+id)
    window.location.reload(); 
  }

  return (
    <>
    <Header/>

    <div className="table-responsive">
        <h1 className="title">Avaliações Ativas</h1>
        <table className="table" style={{width: '100%'}}>
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Pergunta</th>
            <th scope="col">Solicitante</th>
            <th scope="col">Sistema</th>
            <th scope="col">Data início</th>
            <th scope="col">Data Fim</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {avaliationList.map((value, key) => {
            return (
              <tr key={key}>
                  <td> {value.id} </td>
                  <td> {value.question} </td>
                  <td> {value.requester} </td>
                  <td> {value.system} </td>
                  <td> {value.start_date} </td>
                  <td> {value.end_date} </td>
                  <td> {value.status} </td>
                  <td className="align-top"> 
                    <a 
                      href="" 
                      onClick={() => handleDelete(value.id)}
                      >
                      <FaTimes size={20} />
                      </a>
                    <a 
                      href={'/resultado/'+value.id} 
                      style={{color: 'orange', marginLeft: '-4rem'}}>
                      <FaChartLine size={20} />
                      </a>
                    <a
                      href={'/edit/'+value.id}
                      style={{color: 'green', marginLeft: '-4.5rem'}}>
                      <FaEdit size={20} />
                      </a>
                  </td>
                </tr>
                )
              })}
            <tr>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>

            </th>
          </tr>
        </tfoot>
      </table>
     </div>
     </>
  )
}