import { useHistory } from 'react-router-dom';
import React, { useState } from 'react'

export default function Login() {
  const history = useHistory()
  const handleClickRegister = () => history.push('/register')

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
                // value={email}
                // onChange={e => setEmail(e.target.value)}
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
                // value={password}
                // onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-primary btn-block">Login</button>
          <p className="lead mt-4">
            Não possui conta? <a href='#' onClick={handleClickRegister}>Cadastrar</a>
          </p>
        </div>
      </div>
    </div>
  )

}