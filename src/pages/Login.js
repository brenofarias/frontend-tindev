import React, { useState } from "react";
import "./Login.css";

import api from "../services/api";

import logo from "../assets/logo.svg";

export default function Login({ history }) {
  const [username, setUsername] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post("/devs", {
      username
    });

    const { _id } = response.data;

    history.push(`/dev/${_id}`); // FAZ O REDIRECIONAMENTO DA PÁGINA
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} />
        <input
          placeholder="Digite seu usuário no Github"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
