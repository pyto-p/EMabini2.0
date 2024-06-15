import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    studentNumber: '',
    birthDate: '',
    email: '',
    password: '',
    currentPassword: ''
  });

  const { studentNumber, birthDate, email, password, currentPassword } = formData;

  const navigate = useNavigate();

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== currentPassword) {
      console.log('Passwords do not match');
    } else {
      const newUser = {
        studentNumber,
        birthDate,
        email,
        password
      };

      try {
        const res = await axios.post('http://localhost:3001/signup', newUser);
        console.log(res.data);
        navigate('/login');
      } catch (err) {
        console.error(err.response.data);
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-logo">
        <img src="https://www.pup.edu.ph/about/images/PUPLogo.png" alt="University Logo" />
      </div>
      <h1 className="auth-title">Sign Up</h1>
      <form onSubmit={onSubmit} className="auth-form">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="studentNumber"
            placeholder="Student Number"
            value={studentNumber}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            className="form-control"
            name="birthDate"
            placeholder="Birth Date"
            value={birthDate}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            name="currentPassword"
            placeholder="Confirm Password"
            value={currentPassword}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary auth-button">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
