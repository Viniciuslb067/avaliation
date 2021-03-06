import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import Header from "../../components/Header";

import api from "../../services/api";

import "react-toastify/dist/ReactToastify.css";

toast.configure();

export default function Create() {
  const history = useHistory();
  const handleClickDashboard = () => history.push("/dashboard");
  const [question, setQuestion] = useState("");
  const [requester, setRequester] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [system, setSystem] = useState("");
  const [systemList, setSystemList] = useState([]);

  useEffect(() => {
    api.get("/system").then((res) => {
      setSystemList(res.data);
    });
  }, []);

  const handleSubmit = () => {
    const data = {
      question: question,
      requester: requester,
      start_date: startDate,
      end_date: endDate,
      system: system,
    };

    api
      .post("/avaliation", data)
      .then((res) => {
        if (res.data.status === 1) {
          const notify = () => {
            toast.success("" + res.data.success);
          };
          notify();
          handleClickDashboard();
        } else {
          const notify = () => {
            toast.error("" + res.data.error);
          };
          notify();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header />
      <div className="row mt-5">
        <div className="col-md-6 m-auto">
          <div className="card card-body">
            <h1 className="text-center mb-3">
              <i className="fas fa-user-plus"></i> Criar Avaliação
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
              <label>Sistema</label>
              <select
                id="system"
                name="system"
                className="form-control"
                onChange={(e) => setSystem(e.target.value)}
              >
                <option></option>
                {systemList.map((val, key) => {
                  return <option key={key}>{val.system}</option>;
                })}
              </select>
            </div>
            <button
              onClick={handleSubmit}
              className="btn btn-primary btn-block"
            >
              Criar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
