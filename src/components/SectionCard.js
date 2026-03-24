// src/components/SectionCard.js
import React, { useState } from 'react';
import NotationBlock from './NotationBlock';
import '../styles/SargamEditor.css';

const SectionCard = ({ section, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="section-card">
      <div className="section-header">
        <h3>{section.name}</h3>
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? '🔽 Collapse' : '🔼 Expand'}
        </button>
        <button onClick={onDelete}>🗑 Delete</button>
      </div>

      {expanded && (
        <div className="notation-container">
          {section.notation.map((block, i) => (
            <NotationBlock key={i} swaras={block} index={i + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionCard;
