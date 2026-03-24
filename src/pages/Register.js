import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabase/supabaseClient';
import './Register.css'; // Styling added here

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    profession: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, name, phone, profession } = formData;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, phone, profession },
      },
    });

    if (error) {
      alert('Registration failed: ' + error.message);
    } else {
      alert('🎉 Registered successfully!');
      navigate('/login');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>🎵 Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            required
          />
          <select
            name="profession"
            onChange={handleChange}
            required
            defaultValue=""
          >
            <option value="" disabled>Select Profession</option>
            <option value="Singer">Singer</option>
            <option value="Musician">Musician</option>
            <option value="Music Tutor">Music Tutor</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
