import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { useHistory } from 'react-router-dom';

import api from '../../services/api'

export default function Dashboard() {
  const history = useHistory()
  const handleClickLogin = () => history.push('/login')

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState(0)
  const [password2, setPassword2] = useState(0)

  const handleSubmit = () => {
    const data = {
      name: name,
      email: email,
      password: password,
      password2: password2
    }

    api.post('/register', data)
      .then(res => {
        if(res.data.status === 1) {
          alert(res.data.success)
          handleClickLogin()
        } else {
          alert(res.data.error)
        }
      })
      .catch(err => {
        console.log(err)
      })

  }

  return (
    <div className="App">
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <div className="card card-body">
              <h1 className="text-center mb-3">
                <i className="fas fa-user-plus"></i> Cadastrar</h1>
                  <div className="form-group">
                  <label>Name</label>
                  <input
                    type="name"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Nome"
                    onChange={e => setName(e.target.value)}
                  />
                  </div>
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
                  <div className="form-group">
                    <label>Confirma senha</label>
                    <input
                      type="password"
                      id="password2"
                      name="password2"
                      className="form-control"
                      placeholder="Confirma senha"
                      onChange={e => setPassword2(e.target.value)}
                    />
                  </div>
              <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block">
                Cadastrar
              </button>
          <p className="lead mt-4">Possui uma conta? <a href="#" onClick={handleClickLogin}>Login</a></p>
        </div>
      </div>
    </div>
    </div>
  )

}