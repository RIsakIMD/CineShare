const UserController = require('../controllers/user.controller');

//! User routes for register, login, logout, and getting current user details
module.exports = app => {
    app.post('/api/register', UserController.registerUser);
    app.post('/api/login', UserController.userLogin);
    app.post('/api/logout', UserController.userLogout);
    app.get('/api/currentUser', UserController.getCurrentUser);  // New route for getting current user details
};
