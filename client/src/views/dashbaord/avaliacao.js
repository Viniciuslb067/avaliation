import React, { useState, useEffect } from 'react'
import { FaTimes, FaChartLine, FaEdit } from 'react-icons/fa'

import api from '../../services/api'

import Header from '../../components/Header'

export default function Avaliacao() {
  const [avaliationList, setAvaliationList] = useState([])

  useEffect(() => {
    api.get('/avaliacao/ativa')
      .then((res) => {
        setAvaliationList(res.data)
      })
  }, [])

  async function handleDelete(uuid) {
    await api.delete('/delete/' + uuid)
    window.location.reload();
  }

  return (
    <>
      <Header />

      <div className="table-responsive">
        <h1 className="title">Avaliações Ativas</h1>
        <table className="table" style={{ width: '100%' }}>
          <thead className="table-dark" style={{background: "#06111C"}}>
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
                      onClick={() => handleDelete(value.uuid)}
                    >
                      <FaTimes size={20} />
                    </a>
                    <a
                      href={'/resultado/' + value.id}
                      style={{ color: 'orange', marginLeft: '-4rem' }}>
                      <FaChartLine size={20} />
                    </a>
                    <a
                      href={'/edit/' + value.uuid}
                      style={{ color: 'green', marginLeft: '-4.5rem' }}>
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