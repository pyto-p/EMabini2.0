import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    studentNumber: '',
    birthDate: '',
    password: ''
  });

  const { studentNumber, birthDate, password } = formData;
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const user = {
      studentNumber,
      birthDate,
      password
    };

    try {
      const response = await axios.post('http://localhost:3001/login', user);
      setMessage(response.data);
      if (response.data === 'Success') {
      setMessage('Succesfully logged in!');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-logo">
        <img src="https://www.pup.edu.ph/about/images/PUPLogo.png" alt="University Logo" />
      </div>
      <h1 className="auth-title">Log In</h1>
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
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary auth-button">Log In</button>
        {message && <p className="auth-message">{message}</p>}
        <div className="auth-links">
          <Link to="/forgot-password" className="auth-link">Forgot your password?</Link>
          <p>Don’t have an account? <Link to="/signup" className="auth-link">Sign Up</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
