import React, { useEffect, useState } from 'react'
import { Bar, Doughnut } from 'react-chartjs-2'
import { FaQuestion, FaUserTie, FaDesktop } from 'react-icons/fa'
import { useParams } from 'react-router'

import api from '../services/api'

const Chart = () => { 

  const [avaliationList, setAvaliationList] = useState([])
  const [data, setData] = useState([])
  const [comments, setComments] = useState([])
  const [status, setStatus] = useState([])

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

  useEffect(() => {
    async function getData() {
      api.get('/data/'+id)
      .then((res) => {
        setData(res.data)
      })
    }
    getData()
  }, [id])

  useEffect(() => {
    async function getComments() {
      api.get('/comments/'+id)
      .then((res) => {
        setComments(res.data)
      })
    }
    getComments()
  }, [id])

  console.log(comments)


  return (
  <>
    <h1 className="mx-auto" style={{textAlign: 'center', fontSize:'4rem', marginTop: '1rem'}}>Métricas</h1>

    <div className="row" style={{justifyContent: 'center'}}>
      
    <div className="col-md-2">
      <div class="card wow zoomIn animated" style={{width: '20rem'}}>
          <div class="card-body">
            <span className="d-block">
            <FaQuestion  size={30}/>
            <span class="card-text m-2"> {data.question}</span>
            </span>
          </div>
        </div>
    </div>

      <div className="col-md-2">
        <div class="card wow zoomIn animated" style={{width: '20rem'}}>
          <div class="card-body">
           <span className="d-block">
            <FaUserTie  size={30}/>
            <span class="card-text m-2"> {data.requester}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="col-md-2">
        <div class="card wow zoomIn animated" style={{width: '20rem'}}>
          <div class="card-body">
          <span className="d-block">
            <FaDesktop  size={30}/>
            <span class="card-text m-2"> {data.system}</span>
            </span>
          </div>
       </div>
      </div>

      </div>
 
    <div className="row" style={{justifyContent: 'center', marginTop: '2rem'}}>

    <div className="col-md-5.9">
     <div class="card wow zoomIn animated border bg-light" style={{width: '55rem'}}>
      <div class="card-body">

        <Bar
          data={{ 
            labels: ['1 Estrela',  '2 Estrela', '3 Estrela', '4 Estrela', '5 Estrela'],
            datasets: [{
              label: "Estrelas",
              data: [avaliationList[0],avaliationList[1],avaliationList[2],avaliationList[3],avaliationList[4]],
              backgroundColor: ["#007bff", "#ffc107", "#28a745", "#702CA1", "#E21E39"],
              borderWidth: 0.9,
              borderColor: '#FFFFFF',
            }]
          }}
          height={240}
          width={500}
          options={{
                title: {
                  display: true,
                  text: 'Quantidade de Estrelas',
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
        </div>
      </div>
    </div>  
      
    <div className="col-md-6">
      <div class="card wow zoomIn animated border bg-light" style={{width: '55rem'}}>
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
        height={250}
        width={500}
        options={{
              title: {
                display: true,
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
      </div>
    </div>
  </div>

  <div>
    <h1>{comments}</h1>
  </div>

</>
  )
}

export default Chart