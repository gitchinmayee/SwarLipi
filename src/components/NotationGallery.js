import { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabaseClient';

export default function NotationGallery({ userId }) {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const { data, error } = await supabase
      .storage
      .from('notations')
      .list(userId + '/', { limit: 100 });

    if (error) console.error(error);
    else {
      setFiles(data);
      setFilteredFiles(data);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredFiles(
      files.filter((file) => file.name.toLowerCase().includes(term))
    );
  };

  const getPublicUrl = (path) => {
    return supabase.storage.from('notations').getPublicUrl(`${userId}/${path}`).data.publicUrl;
  };

  const handleDelete = async (name) => {
    await supabase.storage.from('notations').remove([`${userId}/${name}`]);
    fetchImages();
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by notation name..."
        style={{
          padding: '8px',
          margin: '10px 0',
          width: '100%',
          borderRadius: '8px',
          border: '1px solid #aaa'
        }}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {filteredFiles.map((file) => (
          <div
            key={file.name}
            style={{
              border: '1px solid #aaa',
              padding: '10px',
              borderRadius: '10px',
              background: '#f9f9f9',
              boxShadow: '0 5px 10px rgba(0,0,0,0.1)'
            }}
          >
            <img
              src={getPublicUrl(file.name)}
              alt={file.name}
              width={150}
              style={{ borderRadius: '5px' }}
            />
            <br />
            <button onClick={() => window.open(getPublicUrl(file.name), '_blank')}>Zoom/View</button>
            <button onClick={() => handleDelete(file.name)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
