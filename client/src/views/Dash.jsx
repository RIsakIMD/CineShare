import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../components/MovieList';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const Dash = ({ errors, setErrors }) => {
    const [allUsers, setAllUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null); 
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/allUsers", { withCredentials: true })
            .then(res => setAllUsers(res.data))
            .catch(err => {
                setErrors([...errors, "User must be logged in to perform this task"]);
                navigate('/')
            });

            axios.get("http://localhost:8000/api/currentUser", { withCredentials: true })
            .then(res => setCurrentUser(res.data))
            .catch(err => console.log("Failed to fetch current user:", err));
    }, []);

    const [movies, setMovies] = useState([]);
    const removeFromDom = movieId => {
        setMovies(movies.filter(movie => movie._id !== movieId));
    }

    const logoutHandle = () => {
        axios
            .post("http://localhost:8000/api/logout")
            .then((res) => {
                console.log("Logged out successfully");
                navigate('/');
            })
            .catch((err) => {
                console.error("Logout failed:", err);
            });
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <h1 className="text-center text-primary display-3">Cine-Share</h1>
                    {currentUser && <h2>Welcome, {currentUser.userName}</h2>}
                </div>
                <div className="d-flex">
                    <Link to={"/movies/new"} className="btn btn-warning me-3">Share a movie</Link>
                    <button onClick={logoutHandle} className="btn btn-dark">Logout</button>
                </div>
            </div>
            <h2 className="text-primary mb-3">Movies</h2>
            <MovieList movies={movies} setMovies={setMovies} removeFromDom={removeFromDom} />
        </div>
    );
    
}

export default Dash;
