import React, { useState, useEffect } from "react";
import { FaTimes, FaChartLine, FaEdit } from "react-icons/fa";
import { Modal } from "antd";
import { toast, ToastContainer } from "react-toastify";

import api from "../../services/api";

import Header from "../../components/Header";

import "react-toastify/dist/ReactToastify.css";

toast.configure();
export default function Sistema() {
  const [avaliationList, setAvaliationList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [uuid, setUuid] = useState("");
  const [question, setQuestion] = useState("");
  const [requester, setRequester] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState(0);

  useEffect(() => {
    async function getInfo() {
      const res = await api.get("/avaliation/" + uuid);
      setQuestion(res.data.question);
      setRequester(res.data.requester);
      setStartDate(res.data.start_date);
      setEndDate(res.data.end_date);
      setStatus(res.data.status);
    }
    getInfo();
  }, [uuid]);

  useEffect(() => {
    api.get("/avaliation").then((res) => {
      setAvaliationList(res.data.avaliationOn);
    });
  }, []);

  async function handleSubmit() {
    const data = {
      question: question,
      requester: requester,
      start_date: startDate,
      end_date: endDate,
      status: status,
      uuid: uuid,
    };

    await api
      .put("/avaliation/" + uuid, data)
      .then((res) => {
        if (res.data.status === 1) {
          const notify = () => {
            toast.success("" + res.data.success);
          };
          notify();
          setVisible(false);
          setTimeout(window.location.reload(), 5000);
        } else {
          const notify = () => {
            toast.warn("" + res.data.error);
          };
          notify();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleDelete(id) {
    await api.delete("/avaliation/" + id);
    window.location.reload();
  }

  return (
    <>
      <Header />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />    
      <div className="table-responsive">
        <h1 className="title">Sistemas Ativos</h1>
        <table className="table" style={{ width: "100%" }}>
          <thead className="table-dark" style={{ background: "#06111C" }}>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Pergunta</th>
              <th scope="col">Solicitante</th>
              <th scope="col">Sistema</th>
              <th scope="col">Data início</th>
              <th scope="col">Data Fim</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {avaliationList.map((value, key) => {
              return (
                <tr key={key}>
                  <td> </td>
                  <td> {value.question} </td>
                  <td> {value.requester} </td>
                  <td> {value.system.split("http://")}</td>
                  <td> {value.start_date.split("-").reverse().join("/")} </td>
                  <td> {value.end_date.split("-").reverse().join("/")} </td>
                  <td> {value.status} </td>
                  <td className="align-top">
                    <a href="" onClick={() => handleDelete(value._id)}>
                      <FaTimes size={20} />
                    </a>
                    <a
                      href={"/resultado/" + value._id}
                      style={{ color: "orange", marginLeft: "-4rem" }}
                    >
                      <FaChartLine size={20} />
                    </a>
                    <a
                      onClick={() => setVisible(true)}
                      onClickCapture={() => setUuid(value._id)}
                      style={{ color: "green", marginLeft: "-4.5rem" }}
                    >
                      <FaEdit size={20} />
                    </a>
                  </td>
                </tr>
              );
            })}
            <tr></tr>
          </tbody>
          <tfoot>
            <tr>
              <th></th>
            </tr>
          </tfoot>
        </table>

        <Modal
          visible={visible}
          onCancel={() => setVisible(false)}
          footer={null}
        >
          <h1 className="text-center mb-3">
            <i className="fas fa-user-plus"></i> Editar Avaliação
          </h1>
          <div className="form-group">
            <label>Pergunta</label>
            <input
              type="name"
              id="question"
              name="question"
              className="form-control"
              placeholder="Pergunta"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Solicitante</label>
            <input
              id="requester"
              name="requester"
              className="form-control"
              placeholder="Solicitante"
              value={requester}
              onChange={(e) => setRequester(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Data início</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Data fim</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select
              id="level"
              name="level"
              className="form-control"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Ativada</option>
              <option>Desativada</option>
            </select>
          </div>
          <button onClick={handleSubmit} className="btn btn-primary btn-block">
            Editar
          </button>
        </Modal>
      </div>
    </>
  );
}
