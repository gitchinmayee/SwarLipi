import React, { useEffect, useState } from 'react';
import './Profile.css';
import { supabase } from '../supabase/supabaseClient';
import Sidebar from '../components/Sidebar';
import { FiMenu } from "react-icons/fi";



const Profile = () => {
  const [user, setUser] = useState(null);
   const [sidebarOpen, setSidebarOpen] = useState(false);
    
      const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
      };
   

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      console.log('Fetched user:', user);
      setUser(user);
    };
    fetchUser();
  }, []);

  return (
    <div className="profile-wrapper">
       <Sidebar isOpen={sidebarOpen} />
      <Sidebar />
      <div className="profile-container">
        <FiMenu onClick={toggleSidebar} className="hamburger-icon" />
        <div className="glass-card">
          <h2>🎤 Profile</h2>
          <div className="profile-details">
            <p><strong>Name:</strong> {user?.name }</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Profession:</strong> {user?.user_metadata?.profession}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
