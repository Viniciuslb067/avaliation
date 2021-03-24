import React, { useState, useEffect } from 'react'

import api from '../../services/api'

import Header from '../../components/Header'
import Chart from '../../components/Chart'

import './style.css'

export default function Resultado() {

  return (
    <>
    <Header/>
    <Chart/>
    </>
  )
}