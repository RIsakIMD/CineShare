const UserController = require('../controllers/user.controller')

//! User routes for register, login, and logout
module.exports = app => {
    app.post('/api/register', UserController.registerUser);
    app.post('/api/login', UserController.userLogin);
    app.post('/api/logout', UserController.userLogout);
};