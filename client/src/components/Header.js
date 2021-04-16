import React from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../services/api";
import { getToken, logout } from "../services/auth";

import "react-toastify/dist/ReactToastify.css";

toast.configure();
export default function Header() {
  const history = useHistory();
  const handleClickLogin = () => history.push("/login");
  const handleClickAvaliacaoInativa = () => history.push("/avaliacao/inativa");
  const handleClickExibirUsuarios = () => history.push("/all/users");
  const handleClickCriar = () => history.push("/create");
  const handleClickCadastrar = () => history.push("/system");
  const handleClickDashboard = () => history.push("/dashboard");
  const handleClickSistema = () => history.push("/dashboard/sistema");

  async function handleLogout() {
    const res = await api.get("/auth/logout", { headers: { token: getToken() } });
    logout();
    const notify = () => {
      toast.success("" + res.data.success);
    };
    notify();
    handleClickLogin();
  }

  function dashboard() {
    return (
      <div>
        <nav
          className="navbar navbar-expand-lg navbar navbar-dark"
          style={{ background: "#06111C" }}
        >
          <a
            className="text-nav navbar-brand"
            href=""
            onClick={handleClickDashboard}
          >
            Painel de Controle
          </a>
          <div className="collapse navbar-collapse" id="navbarColor02">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarColor02"
              aria-controls="navbarColor02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a
                  className="text-nav nav-link"
                  href=""
                  onClick={handleClickAvaliacaoInativa}
                >
                  Exibir avaliações inativas
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="text-nav nav-link"
                  href=""
                  onClick={handleClickExibirUsuarios}
                >
                  Exibir usuários
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="text-nav nav-link"
                  href=""
                  onClick={handleClickSistema}
                >
                  Exibir sistemas
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="text-nav nav-link"
                  href=""
                  onClick={handleClickCriar}
                >
                  Criar avaliação
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="text-nav nav-link"
                  href=""
                  onClick={handleClickCadastrar}
                >
                  Cadastrar Sistema
                </a>
              </li>
            </ul>
            <div className="form-inline my-2 my-lg-0">
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-outline-secondary my-2 my-sm-0"
                type="submit"
                style={{ padding: "9px", fontSize: "16px" }}
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      </div>
    );
  }

  return dashboard();
}
