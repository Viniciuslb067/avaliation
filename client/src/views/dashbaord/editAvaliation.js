import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { toast } from "react-toastify";

import api from "../../services/api";

import "react-toastify/dist/ReactToastify.css";

toast.configure();

export default function Edit() {
  const [question, setQuestion] = useState("");
  const [requester, setRequester] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [objective, setObjective] = useState("");
  const [system, setSystem] = useState("");
  const [status, setStatus] = useState(0);

  const history = useHistory();
  const handleClickDashboard = () => history.push("/dashboard");

  const { uuid } = useParams();

  useEffect(() => {
    async function getInfo() {
      const res = await api.get("/edit/" + uuid);
      setQuestion(res.data.question);
      setRequester(res.data.requester);
      setStartDate(res.data.start_date);
      setEndDate(res.data.end_date);
      setObjective(res.data.objective);
      setSystem(res.data.system);
      setStatus(res.data.status);
    }
    getInfo();
  }, [uuid]);

  async function handleSubmit() {
    const data = {
      question: question,
      requester: requester,
      start_date: startDate,
      end_date: endDate,
      objective: objective,
      system: system,
      status: status,
      uuid: uuid,
    };

    await api
      .put("/edit", data)
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
  }

  return (
    <div className="row mt-5">
      <div className="col-md-6 m-auto">
        <div className="card card-body">
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
              <option>Ativa</option>
              <option>Inativa</option>
            </select>
          </div>
          <button onClick={handleSubmit} className="btn btn-primary btn-block">
            Editar
          </button>
        </div>
      </div>
    </div>
  );
}
