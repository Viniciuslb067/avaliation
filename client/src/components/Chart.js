import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { FaQuestion, FaUserTie, FaDesktop, FaStar } from "react-icons/fa";
import { useParams } from "react-router";
import { Modal } from "antd";

import api from "../services/api";

const Chart = () => {
  const [avaliationList, setAvaliationList] = useState([]);
  const [data, setData] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [status, setStatus] = useState([]);
  const [visible, setVisible] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    async function getNotes() {
      api.get("/avaliate/result/" + id).then((res) => {
        setAvaliationList(res.data.notes);
      });
    }
    getNotes();
  }, [id]);

  useEffect(() => {
    async function getStatus() {
      api.get("/avaliate/result/" + id).then((res) => {
        setStatus(res.data.status);
      });
    }
    getStatus();
  }, [id]);

  useEffect(() => {
    async function getData() {
      api.get("/avaliate/result/" + id).then((res) => {
        setData(res.data.data);
      });
    }
    getData();
  }, [id]);

  useEffect(() => {
    async function getComments() {
      api.get("/avaliate/result/" + id).then((res) => {
        setComentarios(res.data.comments);
      });
    }
    getComments();
  }, [id]);

  return (
    <>
      <h1
        className="mx-auto"
        style={{ textAlign: "center", fontSize: "4rem", marginTop: "1rem" }}
      >
        Métricas
      </h1>

      <div className="row" style={{ justifyContent: "center" }}>
        <div className="col-md-2">
          <div className="card wow zoomIn animated" style={{ width: "20rem" }}>
            <div className="card-body">
              <span className="d-block">
                <FaQuestion size={30} />
                <span className="card-text m-2"> {data.question}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="col-md-2">
          <div className="card wow zoomIn animated" style={{ width: "20rem" }}>
            <div className="card-body">
              <span className="d-block">
                <FaUserTie size={30} />
                <span className="card-text m-2"> {data.requester}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="col-md-2">
          <div className="card wow zoomIn animated" style={{ width: "20rem" }}>
            <div className="card-body">
              <span className="d-block">
                <FaDesktop size={30} />
                <span className="card-text m-2"> {data.system}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cards para os comentarios */}

      <div
        className="row"
        style={{ justifyContent: "center", marginTop: "3rem" }}
      >
        <div className="col-md-2">
          <div
            className="card wow zoomIn animated"
            onClick={() => {setVisible(true)}}
            style={{ width: "20rem", cursor: "pointer" }}
          >
            <div className="card-body">
              <span className="d-block">
                {[...Array(5)].map((star, i) => {
                  return (
                    <label>
                      <input type="radio" name="rating" />
                      <FaStar className="star" color={"#ffc107"} size={30} />
                    </label>
                  );
                })}
                <span className="card-text m-2"> Comentários </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="row"
        style={{ justifyContent: "center", marginTop: "2rem" }}
      >
        <div className="col-md-5.9">
          <div
            className="card wow zoomIn animated border bg-light"
            style={{ width: "55rem" }}
          >
            <div className="card-body">
              <Bar
                data={{
                  labels: [
                    "1 Estrela",
                    "2 Estrela",
                    "3 Estrela",
                    "4 Estrela",
                    "5 Estrela",
                  ],
                  datasets: [
                    {
                      label: "Estrelas",
                      data: [
                        avaliationList[0],
                        avaliationList[1],
                        avaliationList[2],
                        avaliationList[3],
                        avaliationList[4],
                      ],
                      backgroundColor: [
                        "#E21E39",
                        "#ffc107",
                        "#28a745",
                        "#702CA1",
                        "#007bff",
                      ],
                      borderWidth: 0.9,
                      borderColor: "#FFFFFF",
                    },
                  ],
                }}
                height={240}
                width={500}
                options={{
                  title: {
                    display: true,
                    text: "Quantidade de Estrelas",
                    position: "top",
                    fontSize: 50,
                    fontColor: "#000000",
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
                          beginAtZero: true,
                        },
                      },
                    ],
                  },
                  legend: {
                    labels: {
                      fontSize: 15,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div
            className="card wow zoomIn animated border bg-light"
            style={{ width: "55rem" }}
          >
            <Doughnut
              data={{
                labels: ["Enviados", "Pulados"],
                datasets: [
                  {
                    label: "Estrelas",
                    data: [status[0], status[1]],
                    backgroundColor: [
                      "#007bff",
                      "#ffc107",
                      "#28a745",
                      "#702CA1",
                    ],
                    borderWidth: 0.9,
                    borderColor: "#FFFFFF",
                  },
                ],
              }}
              height={250}
              width={500}
              options={{
                title: {
                  display: true,
                  text: "Enviados/Pulados",
                  position: "top",
                  fontSize: 50,
                  fontColor: "#000000",
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
                    fontSize: 15,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      <Modal
        title="Comentários"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        {comentarios.map((value, key) => {
          return (
            <div key={key}>
              <p>
                O usuário: <b>{value.ip_user.split("::ffff:")}</b>, comentou:{" "}
                <b>{value.comments}</b>
              </p>
            </div>
          );
        })}
      </Modal>
    </>
  );
};

export default Chart;
