import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Main.css";

import api from "../services/api";

import logo from "../assets/logo.svg";
import dislike from "../assets/dislike.svg";
import like from "../assets/like.svg";

export default function Main({ match }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get("/devs", {
        headers: { user: match.params.id }
      });

      setUsers(response.data);
    }

    loadUsers();
  }, [match.params.id]);

  async function handleLike(id) {
    await api.post(`/devs/${id}/likes`, null, {
      headers: { user: match.params.id }
    });

    setUsers(users.filter(user => user._id !== id)); // ATUALIZA A LISTA AO VIVO
  }

  async function handleDislike(id) {
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: { user: match.params.id }
    });

    setUsers(users.filter(user => user._id !== id)); // ATUALIZA A LISTA AO VIVO
  }

  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} />
      </Link>
      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <img src={user.avatar} />
              <footer>
                {user.name}
                <p>{user.bio}</p>
              </footer>
              <div className="buttons">
                <button type="button" onClick={() => handleDislike(user._id)}>
                  <img src={dislike} />
                </button>
                <button type="button" onClick={() => handleLike(user._id)}>
                  <img src={like} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">Acabou :(</div>
      )}
    </div>
  );
}
