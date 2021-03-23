import React, { useState, useEffect } from 'react'

import api from '../../services/api'

import Header from './header';
import Chart from '../../components/Chart'
import Cards from '../../components/Cards'

import './style.css'

export default function Resultado() {

  return (
    <>
    <Header/>
    <Chart/>
    </>
  )
}