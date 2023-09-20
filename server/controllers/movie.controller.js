
const Movie = require('../models/movie.model');

module.exports.create = (request, response) => {
    console.log(request.body);
    Movie.create(request.body)
        .then(newMovie => {response.json(newMovie);})
        .catch((err) => {response.json(err)});
}

module.exports.get = (request, response) => {
    Movie.findOne({_id:request.params.id})
        .then(Movie => {response.json(Movie);})
        .catch((err) => {response.json(err)});
}

module.exports.getAll = (request, response) => {
    Movie.find({})
        .then(Movies => {response.json(Movies);})
        .catch((err) => {response.json(err)});
}

module.exports.update = (request, response) => {
    Movie.findOneAndUpdate({_id:request.params.id}, request.body, {new: true, runValidators: true})
        .then(updatedMovie => {response.json(updatedMovie);})
        .catch((err) => {response.json(err)});
}

module.exports.delete = (request, response) => {
    Movie.deleteOne({_id:request.params.id})
        .then(deleteConfirmation => {response.json(deleteConfirmation);})
        .catch((err) => {response.json(err)});
}