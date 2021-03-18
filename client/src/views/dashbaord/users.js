import React, { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'

import api from '../../services/api'
import { getToken, logout } from '../../services/auth'

import Header from './header';

import './style.css'

export default function Users() { 
  const [avaliationList, setAvaliationList] = useState([])
  const [systemList, setSystemList] = useState([])

  useEffect(() => {
    api.get('/all')
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
    await api.delete('/delete/user/'+id)
    window.location.reload(); 
  }

  return (
    <>
    <Header/>
    <div>
        <h1 className="title">Usuários</h1>
        <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Email</th>
            <th scope="col">Função</th>
            <th scope="col">Acesso</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {avaliationList.map((value) => {
            return (
              <tr>
                  <td> {value.id} </td>
                  <td> {value.name} </td>
                  <td> {value.email} </td>
                  <td> {value.level} </td>
                  <td> {value.acess} </td>
                  <td> <a href="" onClick={() => handleDelete(value.id)}><FaTimes /></a></td>
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