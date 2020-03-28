/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const history = useHistory();

  async function handleSignUp(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      state,
    };

    try {
      const response = await api.post('ngos', data);

      alert(`Your access ID: ${response.data.id}`);

      history.push('/');
    } catch (err) {
      alert('Unable to successfully create your account, please try again!');
    }
  }

  return (
    <div className="signup-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Sign up</h1>

          <p>Sign up, and help people find out about your NGO's cases in need of support.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Already a member? Log in
          </Link>

        </section>

        <form onSubmit={handleSignUp}>
          <input
            placeholder="NGO's name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              placeholder="State"
              style={{ width: 93 }}
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>

          <button className="button" type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
}
