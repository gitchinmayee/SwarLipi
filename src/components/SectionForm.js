import React from 'react';

const SectionForm = ({ value, onChange, onAdd }) => (
  <div className="section-form">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Section name (e.g. M1, Antara)"
    />
    <button onClick={onAdd}>Add Section</button>
  </div>
);

export default SectionForm;
