import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { useParams } from 'react-router'

import api from '../services/api'

import './styles.css'

const Chart = () => { 

  const [avaliationList, setAvaliationList] = useState([])

  const { id } = useParams

  useEffect(() => {
    api.get('/count/all/'+id)
      .then((res) => {
        setAvaliationList(res.data)
      })
  }, [id])

  return (
    <>
    <Bar
    data={{ 
      labels: ['1 Estrela',  '2 Estrela', '3 Estrela', '4 Estrela', '5 Estrela'],
      datasets: [{
        label: "Estrelas",
        data: [avaliationList[0],avaliationList[1],avaliationList[2],avaliationList[3],avaliationList[4]],
        backgroundColor: ["#007bff", "#ffc107", "#28a745", "#702CA1"],
        borderWidth: 0.9,
        borderColor: '#FFFFFF',
      }]
     }}
     height={100}
     width={500}
     options={{
          title: {
            display: true,
            text: 'Avaliação',
            position: 'top',
            fontSize: 50,
            fontColor: '#000000',
            padding: 20,
        },
        animation: {
            animateScale: true,
            animateRotate: true,
        },
        legend: {
            display: true,
            text: 'asd',
            position: 'right',
            labels: {
                size: 14,
                lineHeight: 1.6,
                boxWidth: 20,
                fontColor: '#181B22',
                padding: 12,
            }
        },
        tooltips: {
          enabled: true,
      },
              plugins: {
                datalabels: {
                    color: '#FFFFFF',
                    textAlign: 'center',
                    font: {
                        size: 14,
                        weight: 'bold',
                        lineHeight: 1.6,
                    },
                    formatter: function (value, ctx) {
                        return value;
                    }
                }
            },
       maintainAspectRatio: true,
       responsive: true,
       scales: {
         yAxes: [
           {
             ticks: {
               beginAtZero: true
             }
           }
         ]
       }
     }}
    />
    </>
  )
}

export default Chart