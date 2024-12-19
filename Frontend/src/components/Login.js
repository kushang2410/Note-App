import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlertContext from '../context/AlertContext';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState(null); 
    let navigate = useNavigate(); 
    const { showAlert } = useContext(AlertContext);
    const host = "https://note-app-x2xp.onrender.com"
    const HandleSubmit = async (e) => {
        e.preventDefault();
    
        const { email, password } = credentials;
    
        try {
            const response = await fetch(`${host}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                localStorage.setItem('token', data.authtoken);
                localStorage.setItem('loginTimestamp', Date.now()); // Store login timestamp
                navigate('/');
                window.dispatchEvent(new Event('storage'));
                showAlert("Login successful", "success");
            } else {
                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    console.error("Login failed:", data.error);
                    setError(data.message || 'Login failed');
                    showAlert(data.message || 'Login failed', "danger");
                } else {
                    const textResponse = await response.text();
                    console.log(`Unexpected response format: ${textResponse}`);
                    setError('Unexpected response format');
                    showAlert('Unexpected response format', "danger");
                }
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('Login failed. Please try again later.');
            showAlert('Login failed. Please try again later.', "danger");
        }
    };
    
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="container mt-5 d-flex justify-content-center align-items-center margin-top">
            <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
                <h2 className="text-center mb-4">Log in</h2>
                
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                
                <form onSubmit={HandleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-bold">Email address</label>
                        <input type="email" className="form-control fw-bold" id="email" name="email" value={credentials.email} 
                          onChange={onChange} placeholder="Enter your email" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label fw-bold">Password</label>
                        <input type="password" className="form-control fw-bold" id="password" name="password" value={credentials.password}
                          onChange={onChange} placeholder="Enter your password" required/>
                        <div className="text-end mt-3">
                            <Link to="#" className="small text-decoration-none fw-bold">Forgot password?</Link>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 fw-bold">Sign in</button>
                </form>
                <div className="mt-4 text-center fw-bold">
                    Don't have an account?
                </div>
                <Link to="/signup" className="text-decoration-none mt-2 text-center fw-bold">Create New Account</Link>
            </div>
        </div>
    );
};

export default Login;