import { useHistory } from 'react-router-dom';
import React, { useState } from 'react'

import api from '../../services/api';
import {login, setIdUser, setNameUser} from '../../services/auth'

export default function Login() {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleClickRegister = () => history.push('/register')

  async function handleSubmit() {
    await api.post('/login', {email, password})
    .then(res => {
      if(res.data.status === 1) {
        login(res.data.token)
        setIdUser(res.data.id_user)
        setNameUser(res.data.user_name)

        window.location.href = '/dashboard'

      } else {
        alert(res.data.error)
      }
    })
  }

  return (
    <div className="row mt-5">
      <div className="col-md-6 m-auto">
        <div className="card card-body">
          <h1 className="text-center mb-3"><i className="fas fa-sign-in-alt"></i>Login</h1>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Senha"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit} className="btn btn-primary btn-block">Login</button>
          <p className="lead mt-4">
            Não possui conta? <a href='#' onClick={handleClickRegister}>Cadastrar</a>
          </p>
        </div>
      </div>
    </div>
  )

}