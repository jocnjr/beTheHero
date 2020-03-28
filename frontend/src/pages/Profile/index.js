/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);

  const history = useHistory();
  const ngoId = localStorage.getItem('ngoId');
  const ngoName = localStorage.getItem('ngoName');

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ngoId,
      },
    }).then((response) => {
      setIncidents(response.data);
    });
  }, [ngoId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ngoId,
        },
      });
      setIncidents(incidents.filter((incident) => incident.id !== id));
    } catch (error) {
      alert('Error while trying to delete, please try again');
    }
  }

  function handleLogOut() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero" />
        <span>
          Welcome,
          {' '}
          {ngoName}
        </span>

        <Link className="button" to="/incidents/new">
          Create a new case
        </Link>

        <button onClick={handleLogOut} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Cases in need of your help</h1>
      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>Case:</strong>
            <p>{incident.title}</p>

            <strong>Description:</strong>
            <p>{incident.description}</p>

            <strong>Amount Needed:</strong>
            <p>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(incident.value)}</p>

            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
