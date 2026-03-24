import React from 'react';

const SargamBlock = ({ swar, chord }) => {
  return (
    <div className="sargam-block">
      <div className="chord">{chord}</div>
      <div className="swar">{swar}</div>
    </div>
  );
};

export default SargamBlock;
