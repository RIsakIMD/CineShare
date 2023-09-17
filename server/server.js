
const express = require('express');
const app = express();
const port = 8000;
const cors = require("cors");

require("./config/mongoose.config");

//* Load environment variables from a .env file
require('dotenv').config();

app.use(express.json(), express.urlencoded({ extended: true }));

//* Configure CORS options to allow specific origins, HTTP methods, credentials, and response status
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,  // Allow cookies and other credentials to be included
    optionsSuccessStatus: 204,  // A successful OPTIONS response with no data
};
app.use(cors(corsOptions));

// TODO: Add call to Routes here

//* Import and set up routes for User-related endpoints
const UserRoutes = require('./routes/user.routes');
UserRoutes(app);

app.listen(port, () => console.log(`Listening on port: ${port}`) );
