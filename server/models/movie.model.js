
const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    watchedDate: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    favoriteQuote: {
        type: String
    },
    opinion: {
        type: String
    },
    image: {
        data: Buffer,
        contentType: String
    }
}, {timestamps: true});

const Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;
