import React, { useState, useEffect } from "react";
import { FaTimes, FaChartLine, FaEdit } from "react-icons/fa";
import { Modal } from "antd";
import { toast, ToastContainer } from "react-toastify";

import api from "../../services/api";

import Header from "../../components/Header";

import "react-toastify/dist/ReactToastify.css";

toast.configure();
export default function Sistema() {
  const [systemList, setSystemList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [dns, setDns] = useState("");
  const [area, setArea] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    async function getInfo() {
      const res = await api.get("/system/" + id);
      console.log(res.data);
      setName(res.data.name);
      setDns(res.data.dns);
      setArea(res.data.area);
    }
    getInfo();
  }, [id]);

  useEffect(() => {
    api.get("/system").then((res) => {
      setSystemList(res.data);
    });
  }, []);

  async function handleSubmit() {
    const data = {
      name: name,
      dns: dns,
      area: area,
    };

    await api
      .put("/system/" + id, data)
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
    await api.delete("/system/" + id);
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
              <th scope="col"></th>
              <th scope="col">Nome</th>
              <th scope="col">DNS</th>
              <th scope="col">Área</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {systemList.map((value, key) => {
              return (
                <tr key={key}>
                  <td> </td>
                  <td> {value.name} </td>
                  <td> {value.dns} </td>
                  <td> {value.area}</td>
                  <td className="align-top">
                    <a href="" onClick={() => handleDelete(value._id)}>
                      <FaTimes size={20} />
                    </a>
                    <a
                      onClick={() => setVisible(true)}
                      onClickCapture={() => setId(value._id)}
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
            <label>Nome</label>
            <input
              type="name"
              className="form-control"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>DNS</label>
            <input
              className="form-control"
              placeholder="DNS"
              value={dns}
              onChange={(e) => setDns(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Area</label>
            <select
              className="form-control"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            >
              <option></option>
              <option>DIRETORIA DE ATENDIMENTO</option>
              <option>DIRETORIA DE BENEFÍCIOS</option>
              <option>DIRETORIA DE GESTÃO DE PESSOAS</option>
              <option>DIRETORIA DE GESTÃO DE PESSOAS E ADMINISTRAÇÃO</option>
              <option>DIRETORIA DE TECNOLOGIA DA INFORMAÇÃO E INOVAÇÃO</option>
              <option>AUDITORIA-GERAL</option>
              <option>CORREGEDORIA-GERAL</option>
              <option>PRESIDÊNCIA</option>
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
