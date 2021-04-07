import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

import api from "../../services/api";

import Header from "../../components/Header";

export default function Users() {
  const [avaliationList, setAvaliationList] = useState([]);

  useEffect(() => {
    api.get("/all").then((res) => {
      setAvaliationList(res.data);
    });
  }, []);

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
              <th scope="col">#</th>
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
                  <td> {value.id} </td>
                  <td> {value.name} </td>
                  <td> {value.email} </td>
                  <td> {value.level} </td>
                  <td> {value.acess} </td>
                  <td>
                    {" "}
                    <a href="" onClick={() => handleDelete(value.id)}>
                      <FaTimes />
                    </a>
                  </td>
                </tr>
              );
            })}
            <tr></tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
