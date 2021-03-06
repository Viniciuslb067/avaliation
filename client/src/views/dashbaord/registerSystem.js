import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../services/api";

import Header from "../../components/Header";

import "react-toastify/dist/ReactToastify.css";

toast.configure();

export default function RegisterSystem() {
  const history = useHistory();
  const handleClickDashboard = () => history.push("/dashboard");

  const [dns, setDns] = useState("");
  const [name, setName] = useState("");
  const [area, setArea] = useState("");

  const handleSubmit = () => {
    const data = {
      dns: dns,
      name: name,
      area: area,
    };

    api
      .post("/system", data)
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
            <h1 className="text-center mb-3">Cadastrar Sistema</h1>
            <div className="form-group">
              <label>Nome</label>
              <input
                type="name"
                className="form-control"
                placeholder="Exemplo: Humanograma"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>DNS</label>
              <input
                className="form-control"
                placeholder="Exemplo: humanograma-dev.prevnet"
                onChange={(e) => setDns(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Area</label>
              <select
                className="form-control"
                onChange={(e) => setArea(e.target.value)}
              >
                <option></option>
                <option>DIRETORIA DE ATENDIMENTO</option>
                <option>DIRETORIA DE BENEF??CIOS</option>
                <option>DIRETORIA DE GEST??O DE PESSOAS</option>
                <option>DIRETORIA DE GEST??O DE PESSOAS E ADMINISTRA????O</option>
                <option>DIRETORIA DE TECNOLOGIA DA INFORMA????O E INOVA????O</option>
                <option>AUDITORIA-GERAL</option>
                <option>CORREGEDORIA-GERAL</option>
                <option>PRESID??NCIA</option>
              </select>
            </div>
            <button
              onClick={handleSubmit}
              className="btn btn-primary btn-block"
            >
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
