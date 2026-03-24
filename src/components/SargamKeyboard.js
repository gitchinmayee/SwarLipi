import React from 'react';
import './SargamKeyboard.css';

const swars = ['S', 'R', 'G', 'm', 'P', 'D', 'N'];

const SargamKeyboard = ({ onSwarClick }) => {
  return (
    <div className="sargam-keyboard">
      {swars.map((swar) => (
        <button
          key={swar}
          className="swar-btn"
          onClick={() => onSwarClick(swar)}
        >
          {swar}
        </button>
      ))}
    </div>
  );
};

export default SargamKeyboard;
