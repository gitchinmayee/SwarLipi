import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useAuth } from "../context/AuthContext";
import ZoomModal from "../components/ZoomModal";
import Sidebar from "../components/Sidebar";
import { FiMenu } from "react-icons/fi";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const [files, setFiles] = useState([]);
  const [newName, setNewName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    if (user) fetchFiles();
  }, [user]);

  const fetchFiles = async () => {
    const { data, error } = await supabase.storage
      .from("notations")
      .list(`${user.id}/`, { limit: 100 });

    if (error) {
      console.error(error);
    } else {
      setFiles(data);
    }
  };

  // 🔥 FIXED UPLOAD FUNCTION
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !user) {
      alert("User not logged in or file missing");
      return;
    }

    const filePath = `${user.id}/${Date.now()}_${file.name}`;

    // 1️⃣ Upload to storage
    const { error: uploadError } = await supabase.storage
      .from("notations")
      .upload(filePath, file);

    if (uploadError) {
      console.error(uploadError);
      alert("Upload failed: " + uploadError.message);
      return;
    }

    // 2️⃣ Get public URL
    const { data } = supabase.storage
      .from("notations")
      .getPublicUrl(filePath);

    const publicUrl = data.publicUrl;

    // 3️⃣ Save in DB
    const { error: dbError } = await supabase.from("notations").insert([
      {
        title: file.name,
        image_url: publicUrl,
        user_id: user.id,
      },
    ]);

    if (dbError) {
      console.error(dbError);
      alert("DB Error: " + dbError.message);
      return;
    }

    alert("Upload successful!");
    fetchFiles();
  };

  const handleDelete = async (name) => {
    const { error } = await supabase.storage
      .from("notations")
      .remove([`${user.id}/${name}`]);

    if (!error) fetchFiles();
  };

  const handleRename = async (oldName) => {
    if (!newName) return;

    const { data: fileData } = await supabase.storage
      .from("notations")
      .download(`${user.id}/${oldName}`);

    const { error: uploadErr } = await supabase.storage
      .from("notations")
      .upload(`${user.id}/${newName}`, fileData);

    if (!uploadErr) {
      await handleDelete(oldName);
      setNewName("");
      fetchFiles();
    }
  };

  const openModal = async (fileName) => {
    const { data } = await supabase.storage
      .from("notations")
      .getPublicUrl(`${user.id}/${fileName}`);

    setModalImage(data.publicUrl);
    setShowModal(true);
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-page">
      <Sidebar isOpen={sidebarOpen} />

      <div className={`dashboard-content ${sidebarOpen ? "shift" : ""}`}>
        <div className="topbar">
          <div className="header">
            <FiMenu onClick={toggleSidebar} className="hamburger-icon" />
            <h2 className="welcome-text">
              🎵 Welcome {user?.user_metadata?.name || "Musician"}!
            </h2>
          </div>
        </div>

        <div className="upload-section">
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleUpload}
          />
        </div>

        <input
          type="text"
          className="search-bar"
          placeholder="🔍 Search notation name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="notation-gallery">
          {filteredFiles.map((file, i) => {
            const fileUrl = supabase.storage
              .from("notations")
              .getPublicUrl(`${user.id}/${file.name}`).data.publicUrl;

            return (
              <div key={i} className="notation-card">
                {file.name.endsWith(".pdf") ? (
                  <a href={fileUrl} target="_blank" rel="noreferrer">
                    📄 View PDF
                  </a>
                ) : (
                  <img
                    src={fileUrl}
                    alt={file.name}
                    onClick={() => openModal(file.name)}
                  />
                )}
                <p>{file.name}</p>

                <input
                  type="text"
                  placeholder="Rename"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />

                <button onClick={() => handleRename(file.name)}>
                  Rename
                </button>
                <button onClick={() => handleDelete(file.name)}>
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {showModal && (
        <ZoomModal
          imageUrl={modalImage}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;