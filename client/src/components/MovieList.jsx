import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const MovieList = (props) => {
    const { movies, setMovies } = props;

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/movies")
            .then((res) => {
                setMovies(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className='allMovies'>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Release Date</th>
                        <th>Date Watched</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie._id}>
                            <td>
                                <Link to={`/movies/${movie._id}`}>
                                    <img
                                        src={movie.image}
                                        alt={movie.title}
                                        style={{ width: '50px', height: '50px' }}
                                    />
                                </Link>
                            </td>
                            <td><Link to={`/movies/${movie._id}`}>{movie.title}</Link></td>
                            <td>{formatDate(movie.releaseDate)}</td>
                            <td>{formatDate(movie.watchedDate)}</td>
                            <td>{movie.location}</td>
                            <td>
                                <Link className="btn btn-warning" to={`/movies/edit/${movie._id}`}>Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MovieList;
