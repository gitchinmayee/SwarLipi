import React from 'react';

const SongList = ({ songs, onSelect, onDelete }) => {
  return (
    <div className="song-list">
      <h3>Saved Songs</h3>
      {songs.map((song, index) => (
        <div key={index} className="song-item">
          <span onClick={() => onSelect(song)}>{song.name}</span>
          <button onClick={() => onDelete(index)}>🗑️</button>
        </div>
      ))}
    </div>
  );
};

export default SongList;
