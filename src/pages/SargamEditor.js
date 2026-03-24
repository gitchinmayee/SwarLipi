import React, { useState } from 'react';
import '../styles/SargamEditor.css';
import Sidebar from '../components/Sidebar';
import LogoHeader from '../components/LogoHeader';
import "./Dashboard.css";
import { FiMenu } from "react-icons/fi";


const SargamEditor = () => {
  const [songName, setSongName] = useState('');
  const [sections, setSections] = useState([]);
  const [newSectionName, setNewSectionName] = useState('');
  const [currentSwars, setCurrentSwars] = useState([]);
  const [chords, setChords] = useState([]);
  const [currentChord, setCurrentChord] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };
 
  const swars = ['सा', 'रे', 'ग', 'म', 'प', 'ध', 'नी', '-', '|', 'सां', 'रें', 'गं', 'मं', 'पं', 'धं', 'नीं'];

  const addSwar = (swar) => {
    setCurrentSwars([...currentSwars, swar]);
    setChords([...chords, currentChord]);
    setCurrentChord('');
  };

  const clearLast = () => {
    setCurrentSwars(currentSwars.slice(0, -1));
    setChords(chords.slice(0, -1));
  };

  const clearAll = () => {
    setCurrentSwars([]);
    setChords([]);
  };

  const addSection = () => {
    if (!newSectionName || currentSwars.length === 0) return;

    const newSection = {
      name: newSectionName,
      swars: currentSwars,
      chords: chords,
    };

    setSections([...sections, newSection]);
    setCurrentSwars([]);
    setChords([]);
    setNewSectionName('');
  };

  const deleteSection = (index) => {
    const updatedSections = [...sections];
    updatedSections.splice(index, 1);
    setSections(updatedSections);
  };

  return (

    <div className="sargam-wrapper">
      <Sidebar isOpen={sidebarOpen} />


      <div className="sargam-main">
        

        <div className="sargam-editor-container">
          <FiMenu onClick={toggleSidebar} className="hamburger-icon" />
          
          <h2>🎶 Sargam Editor</h2>

          <div className="editor-controls">
            <input
              type="text"
              placeholder="Song Name"
              value={songName}
              onChange={(e) => setSongName(e.target.value)}
            />
          </div>

          <div className="editor-input-area">
            <input
              type="text"
              placeholder="Section name (e.g., Sthayi)"
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Chord (optional)"
              value={currentChord}
              onChange={(e) => setCurrentChord(e.target.value)}
            />

            <div className="swar-buttons">
              {swars.map((swar, idx) => (
                <button key={idx} onClick={() => addSwar(swar)}>{swar}</button>
              ))}
            </div>

            <div className="editor-actions">
              <button onClick={clearLast}>⟲ Clear Last</button>
              <button onClick={clearAll}>🗑️ Clear All</button>
              <button onClick={addSection}>➕ Add Section</button>
            </div>
          </div>

          <div className="notation-preview">
            <h4>📒 Notebook Preview</h4>
            <div className="block-line">
              {currentSwars.map((swar, i) => (
                <div key={i} className="swar-block">
                  <div className="chord">{chords[i]}</div>
                  <div className="swar">{swar}</div>
                  <div className="beat">{(i % 4) + 1}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="notation-display">
            <h4>🎵 Song: {songName}</h4>
            {sections.map((section, idx) => (
              <div key={idx} className="section-block">
                <div className="section-header">
                  <h5>{section.name}</h5>
                  <button onClick={() => deleteSection(idx)}>❌ Delete</button>
                </div>
                <div className="block-line">
                  {section.swars.map((swar, i) => (
                    <div key={i} className="swar-block">
                      <div className="chord">{section.chords[i]}</div>
                      <div className="swar">{swar}</div>
                      <div className="beat">{(i % 4) + 1}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SargamEditor;
