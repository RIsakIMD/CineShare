import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const Update = (props) => {
    const { id } = useParams();
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [watchedDate, setWatchedDate] = useState('');
    const [location, setLocation] = useState('');
    const [favoriteQuote, setFavoriteQuote] = useState('');
    const [opinion, setOpinion] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/movies/' + id)
            .then((res) => {
                setImage(res.data.image);
                setTitle(res.data.title);
                setReleaseDate(res.data.releaseDate);
                setWatchedDate(res.data.watchedDate);
                setLocation(res.data.location);
                setFavoriteQuote(res.data.favoriteQuote);
                setOpinion(res.data.opinion);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const updateMovie = (e) => {
        e.preventDefault();
        axios
            .patch('http://localhost:8000/api/movies/' + id, {
                image: image,
                title: title,
                releaseDate: releaseDate,
                watchedDate: watchedDate,
                location: location,
                favoriteQuote: favoriteQuote,
                opinion: opinion,
            })
            .then((res) => {
                navigate('/dashboard');
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <h1 className="card-header text-success">Edit Movie Information</h1>
                <div className="card-body">
                    <Link to={'/dashboard'} className="btn btn-primary">
                        Back to Dashboard
                    </Link>
                    <form onSubmit={updateMovie} encType="multipart/form-data">
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">
                                Image URL:
                            </label>
                            <input
                                type="text"
                                name="image"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                className="form-control mx-auto"
                                style={{ maxWidth: '300px', textAlign: 'center' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Title:
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="form-control mx-auto"
                                style={{ maxWidth: '300px', textAlign: 'center' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="releaseDate" className="form-label">
                                Release Date:
                            </label>
                            <input
                                type="date"
                                name="releaseDate"
                                value={releaseDate}
                                onChange={(e) => setReleaseDate(e.target.value)}
                                className="form-control mx-auto"
                                style={{ maxWidth: '300px', textAlign: 'center' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="watchedDate" className="form-label">
                                Watched Date:
                            </label>
                            <input
                                type="date"
                                name="watchedDate"
                                value={watchedDate}
                                onChange={(e) => setWatchedDate(e.target.value)}
                                className="form-control mx-auto"
                                style={{ maxWidth: '300px', textAlign: 'center' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="location" className="form-label">
                                Location:
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="form-control mx-auto"
                                style={{ maxWidth: '300px', textAlign: 'center' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="favoriteQuote" className="form-label">
                                Favorite Quote:
                            </label>
                            <input
                                type="text"
                                name="favoriteQuote"
                                value={favoriteQuote}
                                onChange={(e) => setFavoriteQuote(e.target.value)}
                                className="form-control mx-auto"
                                style={{ maxWidth: '300px', textAlign: 'center' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="opinion" className="form-label">
                                Opinion:
                            </label>
                            <input
                                type="text"
                                name="opinion"
                                value={opinion}
                                onChange={(e) => setOpinion(e.target.value)}
                                className="form-control mx-auto"
                                style={{ maxWidth: '300px', textAlign: 'center' }}
                            />
                        </div>
                        <button type="submit" className="btn btn-warning">
                            Update Movie
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Update;


