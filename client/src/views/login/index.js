import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../services/api";

import { login } from "../../services/auth";

import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

toast.configure();

const acessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNzBjNWYyNDk3YTczMzE1MGM5MjM5ZCIsImlhdCI6MTYxODAxMDg0MywiZXhwIjoxNjE4MDk3MjQzfQ.PxGnx0uZb7hiD7eIckfrv32G7n6jw8qYNnM2oJ5hMCM'

const authAxios = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    Authorization: `Bearer ${acessToken}`, 
  }
 })

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClickRegister = () => history.push("/register");

  async function handleSubmit() {
    await authAxios.post("/auth/authenticate", { email, password }).then((res) => {
      if (res.data.status === 1) {
        login(res.data.token);
        window.location.href = "/dashboard";
      } else {
        const notify = () => {
          toast.error("" + res.data.error);
        };
        notify();
      }
    });
  }

  return (
    <div className="row mt-5">
      <div className="col-md-6 m-auto">
        <div className="card card-body">
          <h1 className="text-center mb-3">
            <i className="fas fa-sign-in-alt"></i>Login
          </h1>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleSubmit} className="btn btn-primary btn-block">
            Login
          </button>
          <p className="lead mt-4">
            Não possui conta?{" "}
            <a href="#" onClick={handleClickRegister}>
              Cadastrar
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
