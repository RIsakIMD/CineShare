const MovieController = require('../controllers/movie.controller')

const API_ROOT = '/api/movies/'

module.exports = app => {
    app.get(API_ROOT, MovieController.getAll);
    app.get(API_ROOT + ':id', MovieController.get);
    app.patch(API_ROOT + ':id', MovieController.update);
    app.post(API_ROOT, MovieController.create);
    app.delete(API_ROOT + ':id', MovieController.delete);
}
