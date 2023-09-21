import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const Detail = (props) => {
    const [movie, setMovie] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/movies/' + id)
            .then((res) => {
                setMovie(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const deleteHandle = () => {
        axios.delete('http://localhost:8000/api/movies/' + id)
            .then((res) => {
                navigate("/dashboard");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="container mt-5 text-center">
            <h1 className="text-primary display-3">Cine-Share</h1>
            <h2>Details about {movie.title}</h2>
            <Link to={'/dashboard'} className="btn btn-warning me-3">Back to Dashboard</Link>
            <button className='btn btn-warning deleteButton font-weight-bold' onClick={deleteHandle}>Delete {movie.name}</button>

            <div className="row mt-4">
                {movie.image && (
                    <div className="col-md-4 text-center">
                        <h3>Image:</h3>
                        <img src={movie.image} alt={movie.title} style={{ width: '100%' }} />
                    </div>
                )}
                <div className="col-md-8">
                    <div className='details mx-auto p-3 border border-dark' style={{ width: '100%', maxWidth: '600px' }}>
                        <div className="mb-3">
                            <h3>Movie Title:</h3>
                            <div className="border border-warning p-2">{movie.title}</div>
                        </div>
                        <div className="mb-3">
                            <h3>Release Date:</h3>
                            <div className="border border-warning p-2">{formatDate(movie.releaseDate)}</div>
                        </div>
                        <div className="mb-3">
                            <h3>Date Watched:</h3>
                            <div className="border border-warning p-2">{formatDate(movie.watchedDate)}</div>
                        </div>
                        <div className="mb-3">
                            <h3>Where did you watch this?:</h3>
                            <div className="border border-warning p-2">{movie.location}</div>
                        </div>
                        <div className="mb-3">
                            <h3>Favorite Quote:</h3>
                            <div className="border border-warning p-2">{movie.favoriteQuote}</div>
                        </div>
                        <div className="mb-3">
                            <h3>Opinion:</h3>
                            <div className="border border-warning p-2">{movie.opinion}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;
