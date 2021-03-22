import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import { FaTimes, FaChartLine } from 'react-icons/fa'

import api from '../../services/api'

import Header from './header';

import './style.css'

export default function Avaliacao() {
  const history = useHistory()
  const handleClickWhatever = () => history.push('/resultado/')
  const [avaliationList, setAvaliationList] = useState([])

  useEffect(() => {
    api.get('/avaliacao')
      .then((res) => {
        setAvaliationList(res.data)
      })
  }, [])

  async function handleDelete(id) {
    await api.delete('/delete/'+id)
    window.location.reload(); 
  } 

  async function handleShow(id) {
    handleClickWhatever(id)
    console.log(id)
  }

  return (
    <>
    <Header/>
    <div>
        <h1 className="title">Avaliações Ativas</h1>
        <table className="table table-hover">
        <thead>
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
          {avaliationList.map((value) => {
            return (
              <tr>
                  <td> {value.id} </td>
                  <td> {value.question} </td>
                  <td> {value.requester} </td>
                  <td> {value.system} </td>
                  <td> {value.start_date} </td>
                  <td> {value.end_date} </td>
                  <td> {value.status} </td>
                  <td> <a href="" onClick={() => handleDelete(value.id)}><FaTimes /></a>
                  <a href="" onClick={() => handleShow(value.id)} style={{color: 'black', marginLeft: '3rem'}}><FaChartLine /></a>
                  </td>
              </tr>
            )
          })}
          <tr>
          </tr>
        </tbody>
      </table>
     </div>
     </>
  )
}