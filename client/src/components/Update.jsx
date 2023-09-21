import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [title, setTitle] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [watchedDate, setWatchedDate] = useState("");
    const [location, setLocation] = useState("");
    const [favoriteQuote, setFavoriteQuote] = useState("");
    const [opinion, setOpinion] = useState("");

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

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImageFile(selectedImage);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(selectedImage);
        fileReader.onloadend = () => {
            setImage(fileReader.result);
        };
    };

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
            <div className="card mx-auto" style={{ maxWidth: '600px' }}>
                <h1 className="card-header text-warning">Edit {title}</h1>
                <div className="card-body">
                    <form onSubmit={updateMovie} encType="multipart/form-data">
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Image:</label>
                            <input
                                onChange={handleImageChange}
                                name="image"
                                type="file"
                                className="form-control"
                            />
                        </div>
                        {image && (
                            <div className="mb-3">
                                <label>Image Preview:</label>
                                <img src={imageFile ? URL.createObjectURL(imageFile) : image} alt="Movie Poster Image" className="img-fluid" />
                            </div>
                        )}
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="releaseDate" className="form-label">Release Date:</label>
                            <input
                                type="date"
                                className="form-control"
                                value={releaseDate}
                                onChange={(e) => setReleaseDate(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="watchedDate" className="form-label">Watched Date:</label>
                            <input
                                type="date"
                                className="form-control"
                                value={watchedDate}
                                onChange={(e) => setWatchedDate(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="location" className="form-label">Location Watched:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="favoriteQuote" className="form-label">Favorite Quote:</label>
                            <textarea
                                type="text"
                                className="form-control"
                                value={favoriteQuote}
                                onChange={(e) => setFavoriteQuote(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="opinion" className="form-label">Your Opinion:</label>
                            <textarea
                                type="text"
                                className="form-control"
                                value={opinion}
                                onChange={(e) => setOpinion(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-warning">Update Movie</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Update;
