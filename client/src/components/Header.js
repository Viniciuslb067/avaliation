import React, { useState, useEffect } from 'react'
import { useHistory} from 'react-router-dom';

import api from '../services/api'
import { getToken, logout } from '../services/auth'
import PrivateRoute from '../services/wAuth'

export default function Header() { 

  const history = useHistory()
  const handleClickLogin = () => history.push('/login')
  const [avaliationList, setAvaliationList] = useState([])

  useEffect(() => {
    api.get('/avaliate')
      .then((res) => {
        setAvaliationList(res.data)
      })
  }, [])

  async function handleLogout() {
    const res = await api.get('/logout', {headers: {token: getToken()}})
    logout()
    alert(res.data.success)
    handleClickLogin()
  }

  function dashboard() {
    if(PrivateRoute) {
        return <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="text-nav navbar-brand" href="/dashboard">Painel de Controle</a>
          <div className="collapse navbar-collapse" id="navbarColor02">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
                 </button>
                  <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <a className="text-nav nav-link" href="/avaliacao/inativa">Exibir avaliações inativas</a>
                    </li>
                    <li className="nav-item">
                    <a className="text-nav nav-link" href="/all/users">Exibir usuários</a>
                    </li>
                    <li className="nav-item">
                      <a className="text-nav nav-link" href="/create">Criar avaliação</a>
                    </li>
                    <li className="nav-item">
                    <a className="text-nav nav-link" href="/system">Cadastrar Sistema</a>
                    </li>
                  </ul>
                  <div className="form-inline my-2 my-lg-0">
                    <button onClick={handleLogout} className="text-nav btn-secondary my-4 my-sm-1" type="submit">Logout</button>
                  </div>
            </div>
        </nav>
    </div>
    } else {
      return <div></div>
    }
  }


  return (
    dashboard()
  )
}