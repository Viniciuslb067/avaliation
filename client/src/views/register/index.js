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
  const [isValid, setIsValid] = useState(false);
  const [alert, setAlert] = useState("")

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
          setIsValid(true)
          alert(res.data.success)
        } else {
          setIsValid(false )
          setAlert(res.data.error) 
          alert(res.data.error)
        }
      })
      .catch(err => {
        console.log(err)
      })

  }
  
  console.log(alert)

  return (
    <div className="App">
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <div className="card card-body">
              <h1 className="text-center mb-3">
                <i className="fas fa-user-plus"></i> Cadastrar</h1>
                  <div className="form-group">
                  {isValid 
                          ? <Alert variant="success">Hurray! You're a genius.</Alert>
                          : <div class="alert alert-dismissible alert-warning">
                          <button type="button" class="close" data-dismiss="alert">&times;</button>
                          <h4 class="alert-heading">Erro!</h4>
                          <p class="mb-0">{alert}</p>
                        </div>
                    }
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