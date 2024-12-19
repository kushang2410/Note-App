import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertContext from '../context/AlertContext';

const SignUp = () => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", conformpassword: "" });
  const [error, setError] = useState("");
  let navigate = useNavigate();
  const { showAlert } = useContext(AlertContext);
  const host = "https://note-app-x2xp.onrender.com"
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, conformpassword } = credentials;

    // Check if passwords match
    if (password !== conformpassword) {
      setError("Passwords do not match");
      showAlert("Passwords do not match", "danger");
      return;
    }

    try {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const json = await response.json();
      console.log(json);

      if (response.ok && json.authtoken) {
        navigate("/login");
        showAlert("Registration successful", "success");
      } else {
        setError(json.errors ? json.errors.map(err => err.msg).join(', ') : json.message || "Registration failed");
        showAlert(json.errors ? json.errors.map(err => err.msg).join(', ') : json.message || "Registration failed", "danger");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      showAlert("An error occurred. Please try again later.", "danger");
      console.error("Error during registration:", error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError(""); 
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center margin-top">
      <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4 fw-bold">Sign Up</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-bold">Full Name</label>
            <input
              type="text"
              className="form-control fw-bold"
              id="name"
              name="name"
              value={credentials.name}
              onChange={onChange}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">Email address</label>
            <input
              type="email"
              className="form-control fw-bold"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-bold">Password</label>
            <input
              type="password"
              className="form-control fw-bold"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="conformpassword" className="form-label fw-bold">Confirm Password</label>
            <input
              type="password"
              className="form-control fw-bold"
              id="conformpassword"
              name="conformpassword"
              value={credentials.conformpassword}
              onChange={onChange}
              placeholder="Confirm your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 fw-bold">Sign Up</button>
        </form>
        <div className="mt-3 text-center fw-bold">
          Already have an account? <a href="/login" className="text-decoration-none">Login</a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;