import React, { useState, useEffect } from 'react'
import { useHistory} from 'react-router-dom';
import { FaTimes } from 'react-icons/fa'

import api from '../../services/api'
import { getToken, logout } from '../../services/auth'

import './style.css'

export default function Dashboard() { 
  const history = useHistory()
  const handleClickCreate = () => history.push('/create')
  const handleClickCreateSystem = () => history.push('/system')
  const handleClickLogin = () => history.push('/login')
  const [avaliationList, setAvaliationList] = useState([])
  const [systemList, setSystemList] = useState([])

  useEffect(() => {
    api.get('/avaliate')
      .then((res) => {
        setAvaliationList(res.data)
      })
  }, [])

  useEffect(() => {
    api.get('/system')
      .then((res) => {
        setSystemList(res.data)
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
    window.location.href('/login')
  }


  return (
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
                  <td> <a href="" onClick={handleDelete()}><FaTimes /></a></td>
              </tr>
            )
          })}
          <tr>
          </tr>
        </tbody>
      </table>
     </div>
  )
}