// src/components/NotationCard.js
import React from 'react';
import './NotationCard.css';

const NotationCard = ({ title, url, onDelete }) => {
  return (
    <div className="notation-card">
      <img src={url} alt={title} />
      <div className="notation-info">
        <p>{title}</p>
        <button onClick={onDelete}>🗑 Delete</button>
      </div>
    </div>
  );
};

export default NotationCard;
