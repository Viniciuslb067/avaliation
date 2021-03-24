import React, { useEffect, useState } from 'react'
import { Bar, Doughnut } from 'react-chartjs-2'
import { useParams } from 'react-router'

import api from '../services/api'

const Chart = () => { 

  const [avaliationList, setAvaliationList] = useState([])
  const [status, setStatus ] = useState([])

  const { id } = useParams()

  useEffect(() => {
    async function getNotes() {
      api.get('/count/all/notes/'+id)
      .then((res) => {
        setAvaliationList(res.data)
      })
    }
    getNotes()
  }, [id])

  useEffect(() => {
    async function getStatus() {
      api.get('/count/all/status/'+id)
        .then((res) => {
          setStatus(res.data)
        })
      }
      getStatus()
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
        tooltips: {
          enabled: true,
      },
       maintainAspectRatio: true,
       responsive: true,
       scales: {
         yAxes: [
           {
             ticks: {
               beginAtZero: true
             },
           },
         ],
       },
       legend: {
         labels: {
           fontSize: 15
         }
       }
     }}
    />
    <Doughnut data={{ 
      labels: ['Enviados', 'Pulados'],
      datasets: [{
        label: "Estrelas",
        data: [status[0], status[1]],
        backgroundColor: ["#007bff", "#ffc107", "#28a745", "#702CA1"],
        borderWidth: 0.9,
        borderColor: '#FFFFFF',
      }]
     }}
     height={150}
     width={500}
     options={{
          title: {
            display: false,
            text: 'Enviados/Pulados',
            position: 'top',
            fontSize: 50,
            fontColor: '#000000',
            padding: 20,
        },
        animation: {
            animateScale: true,
            animateRotate: true,
        },
        tooltips: {
          enabled: true,
      },
       maintainAspectRatio: true,
       responsive: true,
       legend: {
         labels: {
           fontSize: 15
         }
       }
     }}
    />
    </>
  )
}

export default Chart