import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Index from './views/index/index'
import Login from './views/login/index'
import Register from './views/register/index'
import Dashboard from './views/dashbaord/index'

export default function Routes() {
  return (
    <BrowserRouter>
    <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/dashboard' component={Dashboard}/>
          <Route path='/' component={Index}/>
    </Switch>
    </BrowserRouter>
  )
}