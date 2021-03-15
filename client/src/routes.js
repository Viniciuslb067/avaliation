import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Index from './views/index/index'
import Login from './views/login/index'
import Register from './views/register/index'
import Create from './views/dashbaord/createAvaliation'
import Edit from './views/dashbaord/editAvaliation'
import Dashboard from './views/dashbaord/index'

import PrivateRoute from './services/wAuth'

export default function Routes() {
  return (
    <BrowserRouter>
    <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <PrivateRoute path='/create' component={Create}/>
          <Route path='/edit' component={Edit} />
          <Route path='/dashboard' component={Dashboard}/>
          <Route path='/' component={Index}/>
    </Switch>
    </BrowserRouter>
  )
}