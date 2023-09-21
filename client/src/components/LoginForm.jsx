import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

const LoginForm = ({ errors, setErrors }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const formHandle = e => {
        e.preventDefault();
        const loginUser = {
            email, password
        }
        axios.post("http://localhost:8000/api/login", loginUser, { withCredentials: true })
            .then(res => navigate('/dashboard'))
            .catch(err => {
                console.log(err);
                setErrors([...errors, "Invalid Login Credentials"])
            })
    }

    return (
        <div className="p-3 rounded">
        <form onSubmit={formHandle}>
            <h3 className="bg-primary text-white p-2 rounded">Login</h3>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="text" className="form-control" name="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="loginPassword" className="form-label">Password:</label>
                <input type="password" className="form-control" name="password" id='loginPassword' value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
        </div>
    )
}

export default LoginForm;
