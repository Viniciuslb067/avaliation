import React, { useState, useEffect } from "react";
import { FaTimes, FaEdit } from "react-icons/fa";
import { Modal } from "antd";
import { toast } from "react-toastify";

import api from "../../services/api";

import Header from "../../components/Header";

import "react-toastify/dist/ReactToastify.css";

toast.configure();
export default function Users() {
  const [avaliationList, setAvaliationList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [uuid, setUuid] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState(0);
  const [access, setAccess] = useState("");

  useEffect(() => {
    async function getInfo() {
      const res = await api.get("/user/" + uuid);
      setName(res.data.name);
      setRole(res.data.role);
      setAccess(res.data.access);
    }
    getInfo();
  }, [uuid]);

  useEffect(() => {
    api.get("/user").then((res) => {
      setAvaliationList(res.data);
    });
  }, []);

  async function handleSubmit() {
    const data = {
      name: name,
      role: role,
      access: access,
      uuid: uuid,
    };

    await api
      .put("/user/" + uuid, data)
      .then((res) => {
        if (res.data.status === 1) {
          const notify = () => {
            toast.success("" + res.data.success);
          };
          notify();
          setVisible(false);
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
    await api.delete("/delete/user/" + id);
    window.location.reload();
  }

  return (
    <>
      <Header />
      <div>
        <h1 className="title">Usuários</h1>
        <table className="table">
          <thead className="table-dark" style={{ background: "#06111C" }}>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Email</th>
              <th scope="col">Função</th>
              <th scope="col">Acesso</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {avaliationList.map((value, key) => {
              return (
                <tr key={key}>
                  <td> {value.name} </td>
                  <td> {value.email} </td>
                  <td> {value.role} </td>
                  <td> {value.access} </td>
                  <td>
                    <a
                      href=""
                      onClick={() => handleDelete(value.id)}
                      style={{ color: "orange", marginLeft: "-4rem" }}
                    >
                      <FaTimes size={20} />
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
        </table>
        <Modal
          visible={visible}
          onCancel={() => setVisible(false)}
          footer={null}
        >
          <h1 className="text-center mb-3">
            <i className="fas fa-user-plus"></i> Editar Usuário
          </h1>
          <div className="form-group">
            <label>Nome</label>
            <input
              id="name"
              name="name"
              className="form-control"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Função</label>
            <input
              id="role"
              name="role"
              className="form-control"
              placeholder="Função"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Acesso</label>
            <select
              className="form-control"
              value={access}
              onChange={(e) => setAccess(e.target.value)}
            >
              <option>Liberado</option>
              <option>Pendente</option>
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
