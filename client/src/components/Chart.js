import React, { Component, useEffect } from 'react'
import {Pie} from 'react-chartjs-2'

import api from '../services/api'

import './styles.css'

export default function Chart() {
  const data = {
    chartData: {
      labels: ['1 Estrela', '2 Estrela', '3 Estrela', '4 Estrela', '5 Estrela'],
      datasets: [
        {
          label: 'Estrelas',
          data: [
            2,
            3,
            5,
            10,
            13
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
        },
      ]
    },
    options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
  }
  }

  // useEffect(() => {
  //   api.get('/avaliacao')
  //     .then((res) => {
  //       setAvaliationList(res.data)
  //     })
  // }, [])

    return(
      <div>
        <h1 className="title">Hello</h1>
      <div className="chart">
        <Pie
        data={data}
        options={{maintainAspectRatio: false}}
        />
      </div>
      </div> 
    )
}