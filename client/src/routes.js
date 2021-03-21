import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Index from './views/index/index'
import Login from './views/login/index'
import Register from './views/register/index'
import Create from './views/dashbaord/createAvaliation'
import Edit from './views/dashbaord/editAvaliation'
import Avaliacao from './views/dashbaord/avaliacao'
import avaliacaoInativa from './views/dashbaord/avaliacaoInativa'
import Avaliate from './views/avaliate/index'
import RegisterSystem from './views/dashbaord/registerSystem'
import Users from './views/dashbaord/users'
import Resultado from './views/dashbaord/resultado'

import PrivateRoute from './services/wAuth'

export default function Routes() {
  return (
    <BrowserRouter>
    <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <PrivateRoute path='/create' component={Create}/>
          <Route path='/edit/:id' component={Edit}/>
          <Route path='/avaliar' component={Avaliate}/>
          <Route path='/system' component={RegisterSystem}/>
          <PrivateRoute path='/dashboard' component={Avaliacao}/>
          <Route path='/avaliacao/inativa' component={avaliacaoInativa}/>
          <Route path='/all/users' component={Users}/>
          <Route path='/resultado' component={Resultado}/>
          <Route path='/' component={Index}/>
    </Switch>
    </BrowserRouter>
  )
}