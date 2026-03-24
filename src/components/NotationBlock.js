import React from 'react';
import '../styles/SargamEditor.css';

const NotationBlock = ({ swaras }) => (
  <div className="notation-block">
    {swaras.map((swar, idx) => (
      <span key={idx}>{swar}</span>
    ))}
  </div>
);

export default NotationBlock;
