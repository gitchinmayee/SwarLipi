// src/components/NotationGallery.js
import { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { useAuth } from '../context/AuthContext';
import './NotationGallery.css';

export default function NotationGallery({ refresh }) {
  const [files, setFiles] = useState([]);
  const [modalUrl, setModalUrl] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchFiles();
  }, [refresh]);

  const fetchFiles = async () => {
    if (!user) return;
    const { data, error } = await supabase.storage.from('notations').list(user.id + '/');
    if (error) console.error(error);
    else setFiles(data);
  };

  const getUrl = (path) => supabase.storage.from('notations').getPublicUrl(path).data.publicUrl;

  const deleteFile = async (name) => {
    await supabase.storage.from('notations').remove([`${user.id}/${name}`]);
    fetchFiles();
  };

  const renameFile = async (oldName) => {
    const newName = prompt('Enter new name:');
    if (!newName) return;
    const oldPath = `${user.id}/${oldName}`;
    const newPath = `${user.id}/${newName}`;
    
    const { data, error } = await supabase.storage.from('notations').copy(oldPath, newPath);
    if (!error) await supabase.storage.from('notations').remove([oldPath]);
    fetchFiles();
  };

  return (
    <>
      <div className="gallery-scroll">
        {files.map(file => (
          <div key={file.name} className="file-card">
            <img src={getUrl(`${user.id}/${file.name}`)} alt={file.name} onClick={() => setModalUrl(getUrl(`${user.id}/${file.name}`))} />
            <div>{file.name}</div>
            <button onClick={() => setModalUrl(getUrl(`${user.id}/${file.name}`))}>Zoom</button>
            <button onClick={() => renameFile(file.name)}>Rename</button>
            <button onClick={() => deleteFile(file.name)}>Delete</button>
          </div>
        ))}
      </div>

      {modalUrl && (
        <div className="modal-backdrop" onClick={() => setModalUrl(null)}>
          <img className="modal-img" src={modalUrl} alt="Zoom" />
        </div>
      )}
    </>
  );
}
