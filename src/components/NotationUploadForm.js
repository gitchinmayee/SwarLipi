// src/components/UploadForm.js
import { useState } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { useAuth } from '../context/AuthContext';

export default function UploadForm({ onUpload }) {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const { user } = useAuth();

  const handleUpload = async () => {
    if (!file || !name || !user) return alert('Fill all fields');
    const filePath = `${user.id}/${name}`;

    const { error } = await supabase.storage.from('notations').upload(filePath, file);
    if (error) return alert('Upload failed: ' + error.message);
    
    alert('Upload successful!');
    setFile(null);
    setName('');
    onUpload(); // trigger refresh
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <input type="text" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} />
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
