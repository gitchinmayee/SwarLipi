// src/components/NotationModal.js
import React from 'react';
import './NotationModal.css';

const NotationModal = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageUrl} alt="Notation" className="zoomable-image" />
      </div>
    </div>
  );
};

export default NotationModal;
