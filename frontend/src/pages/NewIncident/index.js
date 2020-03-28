/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();
  const ngoId = localStorage.getItem('ngoId');

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ngoId,
        },
      });

      history.push('/profile');
    } catch (error) {
      alert('Unable to create a new case, please try again!');
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Create new case</h1>

          <p>Describe in detail the a specific case your NGO needs help with, to better reach out to your supporters.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Home
          </Link>

        </section>

        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Case title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            placeholder="Value needed in USD"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button className="button" type="submit">Create New Case</button>
        </form>
      </div>
    </div>
  );
}
