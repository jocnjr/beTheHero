/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Login() {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await api.post('sessions', { id });

      localStorage.setItem('ngoId', id);
      localStorage.setItem('ngoName', response.data.name);

      history.push('/profile');
    } catch (error) {
      alert('Unable to login, please try again!');
    }
  }
  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImg} alt="Logo of the app Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>Log in to Be the Hero</h1>

          <input
            placeholder="Your NGO's ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button className="button" type="submit">Log in</button>

          <Link className="back-link" to="/signup">
            <FiLogIn size={16} color="#E02041" />
            Sign up for your account
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Diverse group of people huging and looking up the sky, heroes." className="" />
    </div>
  );
}
