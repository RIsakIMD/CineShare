import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

const MovieForm = (props) => {
    const { movies, setMovies } = props;
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [watchedDate, setWatchedDate] = useState("");
    const [location, setLocation] = useState("");
    const [favoriteQuote, setFavoriteQuote] = useState("");
    const [opinion, setOpinion] = useState("");
    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        image: "",
        title: "",
        releaseDate: "",
        watchedDate: "",
        location: "",
        favoriteQuote: null,
        opinion: null,
    });

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    const validateInputs = () => {
        let isValid = true;
        const updatedErrors = {
            image: "",
            title: "",
            releaseDate: "",
            watchedDate: "",
            location: "",
            favoriteQuote: null,
            opinion: null,
        };

        if (!image) {
            updatedErrors.image = "Must upload an image";
            isValid = false;
        }

        if (title.length < 3) {
            updatedErrors.title = "Movie title must be at least 3 characters";
            isValid = false;
        }

        if (releaseDate.length < 1) {
            updatedErrors.releaseDate = "Release date must be entered";
            isValid = false;
        }

        if (watchedDate.length < 1) {
            updatedErrors.watchedDate = "Watched date must be entered";
            isValid = false;
        }

        if (location.length < 3) {
            updatedErrors.location = "The location you watched this must be at least 3 characters";
            isValid = false;
        }

        setErrors(updatedErrors);
        return isValid;
    };

    const submitHandle = async (e) => {
        e.preventDefault();

        if (validateInputs()) {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onloadend = async () => {
                try {
                    const base64Image = reader.result;
                    const response = await axios.post(
                        "http://localhost:8000/api/movies/",
                        {
                            image: base64Image,
                            title,
                            releaseDate,
                            watchedDate,
                            location,
                            favoriteQuote,
                            opinion
                        }
                    );
                    console.log(response.data);
                    setMovies([...movies, response.data]);
                    setImage(null);
                    setTitle("");
                    setReleaseDate("");
                    setWatchedDate("");
                    setLocation("");
                    setFavoriteQuote("");
                    setOpinion("");
                    navigate("/dashboard");
                } catch (error) {
                    console.error(error);
                }
            };
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1 className="text-center text-primary display-3">Cine-Share</h1>
                    <h2 className="text-center text-primary mb-3">Tell us what you watched!</h2>
                    <Link to={"/dashboard"} className="d-block text-center text-primary mb-3">Back to Dashboard</Link>

                    <div className="card mt-4 border-primary">
                        <div className="card-body">
                            <form onSubmit={submitHandle} encType="multipart/form-data">
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">Image:</label>
                                    <input
                                        onChange={handleImageChange}
                                        name="image"
                                        type="file"
                                        className={`form-control ${errors.image && "is-invalid"}`}
                                    />
                                    {errors.image && <div className="invalid-feedback">{errors.image}</div>}
                                </div>
                                {image && (
                                    <div className="mb-3">
                                        <label>Image Preview:</label>
                                        <img src={URL.createObjectURL(image)} alt="Movie Poster Image" className="img-fluid" />
                                    </div>
                                )}
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title:</label>
                                    <input
                                        onChange={(e) => setTitle(e.target.value)}
                                        value={title}
                                        name="title"
                                        type="text"
                                        className={`form-control ${errors.title && "is-invalid"}`}
                                    />
                                    {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="releaseDate" className="form-label">Release Date:</label>
                                    <input
                                        onChange={(e) => setReleaseDate(e.target.value)}
                                        value={releaseDate}
                                        name="releaseDate"
                                        type="date"
                                        className={`form-control ${errors.releaseDate && "is-invalid"}`}
                                    />
                                    {errors.releaseDate && <div className="invalid-feedback">{errors.releaseDate}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="watchedDate" className="form-label">Watched Date:</label>
                                    <input
                                        onChange={(e) => setWatchedDate(e.target.value)}
                                        value={watchedDate}
                                        name="watchedDate"
                                        type="date"
                                        className={`form-control ${errors.watchedDate && "is-invalid"}`}
                                    />
                                    {errors.watchedDate && <div className="invalid-feedback">{errors.watchedDate}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="location" className="form-label">Location Watched:</label>
                                    <input
                                        onChange={(e) => setLocation(e.target.value)}
                                        value={location}
                                        name="location"
                                        type="text"
                                        className={`form-control ${errors.location && "is-invalid"}`}
                                    />
                                    {errors.location && <div className="invalid-feedback">{errors.location}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="favoriteQuote" className="form-label">Favorite Quote:</label>
                                    <textarea
                                        onChange={(e) => setFavoriteQuote(e.target.value)}
                                        value={favoriteQuote}
                                        name="favoriteQuote"
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="opinion" className="form-label">Your Opinion:</label>
                                    <textarea
                                        onChange={(e) => setOpinion(e.target.value)}
                                        value={opinion}
                                        name="opinion"
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieForm;
